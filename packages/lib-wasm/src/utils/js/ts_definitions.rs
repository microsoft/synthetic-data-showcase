use wasm_bindgen::prelude::*;

#[wasm_bindgen(typescript_custom_section)]
const TS_APPEND_CONTENT: &'static str = r#"
export type ReportProgressCallback = (progress: number) => boolean

export type HeaderNames = string[]

export interface IMultiValueColumns {
  [headerName: string]: string
}

export interface ICsvDataParameters {
  delimiter: string
  useColumns: HeaderNames
  multiValueColumns: IMultiValueColumns
  sensitiveZeros: HeaderNames
  recordLimit: number
}

export interface ISingleAttributeCounts {
  [attr: string]: number
}

export interface IRecordsCountByColumn {
  [headerName: string]: number
}

export interface IAggregateStatistics {
  numberOfDistinctAttributes: number
  singleAttributeCounts: ISingleAttributeCounts
  numberOfUniqueCombinations: number
  numberOfRecordsWithUniqueCombinations: number
  numberOfRecordsWithUniqueCombinationsPerColumn: IRecordsCountByColumn
  numberOfRareCombinations: number
  numberOfRecordsWithRareCombinations: number
  numberOfRecordsWithRareCombinationsPerColumn: IRecordsCountByColumn
  numberOfRecords: number
  numberOfDistinctCombinations: usize
}

export enum NoisyCountThresholdType {
  Fixed = 'Fixed',
  Adaptive = 'Adaptive'
}

export interface IInputNumberByLength {
  [length: number]: number
}

export interface INoisyCountThreshold {
  type: NoisyCountThresholdType
  valuesByLen: IInputNumberByLength
}

export interface IDpParameters {
  epsilon: number
  delta: number
  percentilePercentage: number
  percentileEpsilonProportion: number
  sigmaProportions?: number[]
}

export interface IOversamplingParameters {
  oversamplingRatio?: number
  oversamplingTries?: number
}

export interface IBaseSynthesisParameters {
  resolution: usize,
  cacheMaxSize?: number
  emptyValue?: string
}

export interface IGenerateResult {
  expansionRatio: number
  resolution: number
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
  percentageOfSuppressedCombinations: number
  percentageOfFabricatedCombinations: number
  originalCombinationsCountMean: number
  originalCombinationsCountMeanByLen: IMetricByKey
  combinationsCountMeanAbsError: number
  combinationsCountMeanAbsErrorByLen: IMetricByKey
  meanProportionalError: number
  meanProportionalErrorByBucket: IMetricByKey
  meanCombinationLengthByBucket: IMetricByKey
  recordExpansionPercentage: number
  combinationsCountMeanByLen: IMetricByKey
  totalNumberOfCombinationsByLen: IMetricByKey
  numberOfRareCombinationsByLen: IMetricByKey
  percentageOfRareCombinationsByLen: IMetricByKey
  leakageCountByLen: IMetricByKey
  leakagePercentageByLen: IMetricByKey
  percentageOfRecordsWithUniqueCombinations: number
  percentageOfRecordsWithRareCombinations: number
  percentageOfUniqueCombinations: number
  percentageOfRareCombinations: number
}

export interface IEvaluateResult {
  reportingLength: usize
  aggregateCountsStats: IMicrodataStatistics
  sensitiveDataStats: IMicrodataStatistics
  syntheticDataStats: IMicrodataStatistics
  syntheticVsAggregateDataStats: IMicrodataStatistics
}

export interface INavigateResult {
  headerNames: HeaderNames
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

    #[wasm_bindgen(typescript_type = "IMultiValueColumns")]
    pub type JsMultiValueColumns;

    #[wasm_bindgen(typescript_type = "ICsvDataParameters")]
    pub type JsCsvDataParameters;

    #[wasm_bindgen(typescript_type = "ISingleAttributeCounts")]
    pub type JsSingleAttributeCounts;

    #[wasm_bindgen(typescript_type = "IRecordsCountByColumn")]
    pub type JsRecordsCountByColumn;

    #[wasm_bindgen(typescript_type = "IAggregateStatistics")]
    pub type JsAggregateStatistics;

    #[wasm_bindgen(typescript_type = "NoisyCountThresholdType")]
    pub type JsNoisyCountThresholdType;

    #[wasm_bindgen(typescript_type = "IInputNumberByLength")]
    pub type JsInputNumberByLength;

    #[wasm_bindgen(typescript_type = "INoisyCountThreshold")]
    pub type JsNoisyCountThreshold;

    #[wasm_bindgen(typescript_type = "IDpParameters")]
    pub type JsDpParameters;

    #[wasm_bindgen(typescript_type = "IOversamplingParameters")]
    pub type JsOversamplingParameters;

    #[wasm_bindgen(typescript_type = "IBaseSynthesisParameters")]
    pub type JsBaseSynthesisParameters;

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

    #[wasm_bindgen(typescript_type = "INavigateResult")]
    pub type JsNavigateResult;

    #[wasm_bindgen(typescript_type = "ISelectedAttributesByColumn")]
    pub type JsSelectedAttributesByColumn;

    #[wasm_bindgen(typescript_type = "IAttributesIntersection")]
    pub type JsAttributesIntersection;

    #[wasm_bindgen(typescript_type = "IAttributesIntersectionByColumn")]
    pub type JsAttributesIntersectionByColumn;
}

pub type JsResult<T> = Result<T, JsValue>;
