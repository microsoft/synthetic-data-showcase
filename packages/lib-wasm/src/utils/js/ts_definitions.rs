use wasm_bindgen::prelude::*;

#[wasm_bindgen(typescript_custom_section)]
const TS_APPEND_CONTENT: &'static str = r#"
export type ReportProgressCallback = (progress: number) => void;

export type HeaderNames = string[];

export interface IGenerateResult {
  expansionRatio: number;
  syntheticData: string;
}

export interface IPrivacyRiskSummary {
  totalNumberOfRecords: number
  totalNumberOfCombinations: number
  recordsWithUniqueCombinationsCount: number
  recordsWithRareCombinationsCount: number
  uniqueCombinationsCount: number
  rareCombinationsCount: number
  recordsWithUniqueCombinationsProportion: number
  recordsWithRareCombinationsProportion: number
  uniqueCombinationsProportion: number
  rareCombinationsProportion: number
}

export interface IAggregateCountByLen {
  [length: number]: number
}

export interface IAggregateResult {
  reportingLength: number;
  aggregatesData?: string;
  rareCombinationsCountByLen: IAggregateCountByLen;
  combinationsCountByLen: IAggregateCountByLen;
  combinationsSumByLen: IAggregateCountByLen;
  privacyRisk: IPrivacyRiskSummary;
}

export interface IPreservationByCountBucket {
  size: number;
  preservationSum: number;
  lengthSum: number;
  combinationCountSum: number;
}

export interface IPreservationByCountBuckets {
  [bucket_index: number]: IPreservationByCountBucket;
}

export interface IPreservationByCount {
  buckets: IPreservationByCountBuckets;
  combinationLoss: number;
}

export interface IEvaluateResult {
  sensitiveAggregateResult: IAggregateResult;
  syntheticAggregateResult: IAggregateResult;
  leakageCountByLen: IAggregateCountByLen;
  fabricatedCountByLen: IAggregateCountByLen;
  preservationByCount: IPreservationByCount;
  recordExpansion: number;
}

export interface ISelectedAttributesByColumn {
  [columnIndex: number]: Set<string>;
}

export interface IAttributesIntersection {
  value: string;
  estimatedCount: number;
  actualCount?: number;
}

export interface IAttributesIntersectionByColumn {
  [columnIndex: number]: IAttributesIntersection[];
}"#;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(typescript_type = "ReportProgressCallback")]
    pub type JsReportProgressCallback;

    #[wasm_bindgen(typescript_type = "HeaderNames")]
    pub type JsHeaderNames;

    #[wasm_bindgen(typescript_type = "IGenerateResult")]
    pub type JsGenerateResult;

    #[wasm_bindgen(typescript_type = "IPrivacyRiskSummary")]
    pub type JsPrivacyRiskSummary;

    #[wasm_bindgen(typescript_type = "IAggregateCountByLen")]
    pub type JsAggregateCountByLen;

    #[wasm_bindgen(typescript_type = "IAggregateResult")]
    pub type JsAggregateResult;

    #[wasm_bindgen(typescript_type = "IPreservationByCountBucket")]
    pub type JsPreservationByCountBucket;

    #[wasm_bindgen(typescript_type = "IPreservationByCountBuckets")]
    pub type JsPreservationByCountBuckets;

    #[wasm_bindgen(typescript_type = "IPreservationByCount")]
    pub type JsPreservationByCount;

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
