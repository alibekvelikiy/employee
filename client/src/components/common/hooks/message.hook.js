import {useCallback} from "react";

export const useMessage = () => useCallback(text => {
    if(window.M && text) {
        return window.M.toast({html: text})
    }
}, [])