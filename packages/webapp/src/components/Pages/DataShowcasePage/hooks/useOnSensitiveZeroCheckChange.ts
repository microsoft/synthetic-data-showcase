import { useCallback } from "react";
import { SetterOrUpdater } from "recoil";
import { ICsvContent } from "~models";

export function useOnSensitiveZeroCheckToggle(setter: SetterOrUpdater<ICsvContent>,) {
    return useCallback((index) => {
        setter(previous => ({
            ...previous,
            headers: [
                ...previous.headers.slice(0, index),
                {
                    ...previous.headers[index],
                    hasSensitiveZeros: !previous.headers[index].hasSensitiveZeros,
                },
                ...previous.headers.slice(index + 1),
            ],
        }))
    }, [setter])
}