import { useSelector as useReduxSelector, TypedUseSelectorHook, useDispatch } from "react-redux";

import {
    RootState,
    AppDispatch
} from "./store";
import { useState } from "react";

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useDepositModal = () => {
    const [depositOpen, setDepositOpen] = useState<boolean>(false);
    const open = () => {
        setDepositOpen(true)
    };
    const close = () => {
        setDepositOpen(false)
    };

    return {
        depositOpen,
        open,
        close
    }
}