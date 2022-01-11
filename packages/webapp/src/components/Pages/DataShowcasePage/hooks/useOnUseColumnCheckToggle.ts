import { useCallback } from "react";
import { SetterOrUpdater } from "recoil";
import { ICsvContent } from "~models";

export function useOnUseColumnCheckToggle(setter: SetterOrUpdater<ICsvContent>,) {
    return useCallback((index) => {
        setter(previous => ({
            ...previous,
            headers: [
                ...previous.headers.slice(0, index),
                {
                    ...previous.headers[index],
                    use: !previous.headers[index].use,
                },
                ...previous.headers.slice(index + 1),
            ],
        }))
    }, [setter])
}