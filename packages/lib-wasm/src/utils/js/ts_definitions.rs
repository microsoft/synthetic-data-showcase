use wasm_bindgen::prelude::*;

#[wasm_bindgen(typescript_custom_section)]
const TS_APPEND_CONTENT: &'static str = r#"
export type ReportProgressCallback = (progress: number) => void

export type HeaderNames = string[]

export interface IGenerateResult {
  expansionRatio: number
  syntheticData: string
}

export interface IMetricByKey {
  [length: number]: number
}

export interface IAggregateResult {
  reportingLength: number
  aggregatesData?: string
}

export interface IMicrodataStatistics {
  suppressedCombinationsPercentage: number
  fabricatedCombinationsPercentage: number
  originalMeanCombinationsCount: number
  originalMeanCombinationsCountByLen: IMetricByKey
  meanCombinationsCountError: number
  meanCombinationsCountErrorByLen: IMetricByKey
  meanProportionalError: number
  meanProportionalErrorByBucket: IMetricByKey
  meanCombinationsLengthByBucket: IMetricByKey
  meanCombinationsCountByLen: IMetricByKey
  distinctCombinationsCountByLen: IMetricByKey
  rareCombinationsCountByLen: IMetricByKey
  rareCombinationsPercentageByLen: IMetricByKey
  leakageCountByLen: IMetricByKey
  leakagePercentageByLen: IMetricByKey
  recordsWithUniqueCombinationsPercentage: number
  recordsWithRareCombinationsPercentage: number
  uniqueCombinationsPercentage: number
  rareCombinationsPercentage: number
  recordExpansionPercentage: number
}

export interface IEvaluateResult {
  reportingLength: usize
  aggregateCountsStats: IMicrodataStatistics
  sensitiveDataStats: IMicrodataStatistics
  syntheticDataStats: IMicrodataStatistics
}

export interface ISelectedAttributesByColumn {
  [columnIndex: number]: Set<string>
}

export interface IAttributesIntersection {
  value: string
  estimatedCount: number
  actualCount?: number
}

export interface IAttributesIntersectionByColumn {
  [columnIndex: number]: IAttributesIntersection[]
}"#;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(typescript_type = "ReportProgressCallback")]
    pub type JsReportProgressCallback;

    #[wasm_bindgen(typescript_type = "HeaderNames")]
    pub type JsHeaderNames;

    #[wasm_bindgen(typescript_type = "IGenerateResult")]
    pub type JsGenerateResult;

    #[wasm_bindgen(typescript_type = "IMetricByKey")]
    pub type JsMetricByKey;

    #[wasm_bindgen(typescript_type = "IAggregateResult")]
    pub type JsAggregateResult;

    #[wasm_bindgen(typescript_type = "IMicrodataStatistics")]
    pub type JsMicrodataStatistics;

    #[wasm_bindgen(typescript_type = "IEvaluateResult")]
    pub type JsEvaluateResult;

    #[wasm_bindgen(typescript_type = "ISelectedAttributesByColumn")]
    pub type JsSelectedAttributesByColumn;

    #[wasm_bindgen(typescript_type = "IAttributesIntersection")]
    pub type JsAttributesIntersection;

    #[wasm_bindgen(typescript_type = "IAttributesIntersectionByColumn")]
    pub type JsAttributesIntersectionByColumn;
}

pub type JsResult<T> = Result<T, JsValue>;
