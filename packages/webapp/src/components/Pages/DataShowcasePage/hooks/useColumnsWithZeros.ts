import { useMemo } from "react";
import { ICsvContent } from "~models";

export function useColumnsWithZeros(content: ICsvContent) {
    return useMemo(() => content.columnsWithZeros?.filter(
		i => content.headers[i].use,
	), [content])
}