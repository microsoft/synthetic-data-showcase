use log::info;
use rand::{prelude::Distribution as rand_dist, thread_rng};
use statrs::distribution::Laplace;

use crate::dp::DEFAULT_TOLERANCE;

#[derive(Debug)]
pub(crate) struct NoiseParameters {
    pub(crate) percentile_epsilon: f64,
    pub(crate) sigmas: Vec<f64>,
    pub(crate) delta: f64,
    pub(crate) protected_number_of_records: Option<usize>,
}

impl NoiseParameters {
    #[inline]
    fn split_budget_for_records_and_marginals(
        total_epsilon: f64,
        number_of_records_epsilon_proportion: f64,
    ) -> (f64, f64) {
        assert!(
            number_of_records_epsilon_proportion < 1.0
                && number_of_records_epsilon_proportion > 0.0,
            "number_of_records_epsilon_proportion must be > 0 and < 1"
        );

        // total_epsilon = marginals_epsilon + number_of_records_epsilon
        let number_of_records_epsilon = number_of_records_epsilon_proportion * total_epsilon;
        let marginals_epsilon = total_epsilon - number_of_records_epsilon;

        (number_of_records_epsilon, marginals_epsilon)
    }

    #[inline]
    fn delta_value_or_default(delta_opt: &Option<f64>, number_of_records: usize) -> f64 {
        assert!(
            number_of_records > 0,
            "number_of_records must be greater than 0"
        );

        let number_of_records_f64 = number_of_records as f64;
        let delta = delta_opt.unwrap_or(1.0 / (number_of_records_f64.ln() * number_of_records_f64));

        assert!(
            delta > 0.0 && delta < 1.0,
            "delta value must be between 0 and 1"
        );

        delta
    }

    #[inline]
    fn unwrap_sigma_proportions_or_default(
        sigma_proportions_opt: &Option<Vec<f64>>,
        reporting_length: usize,
    ) -> Vec<f64> {
        let sigma_proportions = match sigma_proportions_opt {
            Some(proportions) => proportions.clone(),
            None => {
                let mut v = Vec::default();
                v.resize_with(reporting_length, || 1.0);
                v
            }
        };

        assert!(
            reporting_length == sigma_proportions.len(),
            "sigma proportions array size should match the reporting length",
        );

        sigma_proportions
    }

    #[inline]
    pub fn protect_number_of_records(
        number_of_records_epsilon: f64,
        number_of_records: usize,
    ) -> usize {
        info!(
            "protecting reported number of records with epsilon = {}",
            number_of_records_epsilon
        );

        assert!(
            number_of_records_epsilon > 0.0,
            "number of records epsilon should be > 0"
        );

        let protected_number_of_records = ((number_of_records as f64)
            + Laplace::new(0.0, 1.0 / number_of_records_epsilon)
                .expect("error generating Laplace noise")
                .sample(&mut thread_rng()))
        .round();

        assert!(
            protected_number_of_records > 0.0,
            "adding noise to number of records resulted in a negative number"
        );

        protected_number_of_records as usize
    }

    #[inline]
    fn calc_percentile_epsilon_and_sigmas(
        reporting_length: usize,
        marginals_epsilon: f64,
        delta: f64,
        sigma_proportions: &[f64],
        percentile_epsilon_proportion: f64,
    ) -> (f64, Vec<f64>) {
        assert!(
            percentile_epsilon_proportion < 1.0 && percentile_epsilon_proportion > 0.0,
            "percentile_epsilon_proportion must be > 0 and < 1"
        );

        let t = reporting_length as f64;
        let rho_sqrt = (marginals_epsilon + (2.0 / delta).ln()).sqrt() - (2.0 / delta).ln().sqrt();
        let rho = rho_sqrt * rho_sqrt;
        let k: f64 = sigma_proportions.iter().map(|p| 1.0 / (p * p)).sum();
        let percentile_epsilon = (2.0 * rho * percentile_epsilon_proportion / t).sqrt();
        let base_sigma = (k / (2.0 * rho * (1.0 - percentile_epsilon_proportion))).sqrt();
        let sigmas: Vec<f64> = sigma_proportions.iter().map(|p| p * base_sigma).collect();
        let lhs = ((t * percentile_epsilon * percentile_epsilon) / 2.0)
            + (sigmas.iter().map(|s| 1.0 / (s * s)).sum::<f64>() / 2.0);

        info!("percentile epsilon = {percentile_epsilon}, calculated sigmas = {sigmas:?}");

        assert!(
            (lhs - rho).abs() <= DEFAULT_TOLERANCE,
            "something went wrong calculating DP sigmas"
        );

        (percentile_epsilon, sigmas)
    }

    #[inline]
    fn calc_marginals_parameters(
        reporting_length: usize,
        total_epsilon: f64,
        delta_opt: &Option<f64>,
        number_of_records_epsilon_proportion_opt: &Option<f64>,
        sigma_proportions_opt: &Option<Vec<f64>>,
        number_of_records: usize,
    ) -> (Vec<f64>, f64, f64, Option<usize>, f64) {
        let sigma_proportions = NoiseParameters::unwrap_sigma_proportions_or_default(
            sigma_proportions_opt,
            reporting_length,
        );
        let number_of_records_epsilon: f64;
        let marginals_epsilon: f64;
        let protected_number_of_records: Option<usize>;
        let delta: f64;

        if let Some(number_of_records_epsilon_proportion) = number_of_records_epsilon_proportion_opt
        {
            // get a fraction of the budget to protect the number of records
            (number_of_records_epsilon, marginals_epsilon) =
                NoiseParameters::split_budget_for_records_and_marginals(
                    total_epsilon,
                    *number_of_records_epsilon_proportion,
                );

            // consume budget to protect number of records
            protected_number_of_records = Some(NoiseParameters::protect_number_of_records(
                number_of_records_epsilon,
                number_of_records,
            ));

            // build delta from the protected number of records
            delta = NoiseParameters::delta_value_or_default(
                delta_opt,
                protected_number_of_records.unwrap(),
            );
        } else {
            // we don't want to protect the number of records, use all
            // the budget for the marginals
            number_of_records_epsilon = 0.0;
            marginals_epsilon = total_epsilon;
            protected_number_of_records = None;
            delta = NoiseParameters::delta_value_or_default(delta_opt, number_of_records);
        }

        (
            sigma_proportions,
            number_of_records_epsilon,
            marginals_epsilon,
            protected_number_of_records,
            delta,
        )
    }

    #[inline]
    pub fn new(
        reporting_length: usize,
        total_epsilon: f64,
        delta_opt: &Option<f64>,
        percentile_epsilon_proportion: f64,
        number_of_records_epsilon_proportion_opt: &Option<f64>,
        sigma_proportions_opt: &Option<Vec<f64>>,
        number_of_records: usize,
    ) -> NoiseParameters {
        let (
            sigma_proportions,
            number_of_records_epsilon,
            marginals_epsilon,
            protected_number_of_records,
            delta,
        ) = NoiseParameters::calc_marginals_parameters(
            reporting_length,
            total_epsilon,
            delta_opt,
            number_of_records_epsilon_proportion_opt,
            sigma_proportions_opt,
            number_of_records,
        );

        info!(
            "calculating percentile epsilon and sigmas with:
                total_epsilon = {total_epsilon},
                number_of_records_epsilon = {number_of_records_epsilon},
                marginals_epsilon = {marginals_epsilon},
                delta = {delta},
                percentile_epsilon_proportion = {percentile_epsilon_proportion},
                number_of_records_epsilon_proportion = {number_of_records_epsilon_proportion_opt:?},
                sigma_proportions = {sigma_proportions:?}"
        );

        let (percentile_epsilon, sigmas) = NoiseParameters::calc_percentile_epsilon_and_sigmas(
            reporting_length,
            marginals_epsilon,
            delta,
            &sigma_proportions,
            percentile_epsilon_proportion,
        );

        NoiseParameters {
            percentile_epsilon,
            sigmas,
            delta,
            protected_number_of_records,
        }
    }
}
