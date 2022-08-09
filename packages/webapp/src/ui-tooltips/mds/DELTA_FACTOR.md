Factor used to calculate the delta DP parameter.

`Delta = 1 / ([delta factor] * [record limit])`

If set to `0`, then will default at runtime to `ln(record limit)`, resulting in:

`Delta = 1 / (ln(record limit) * [record limit])`
