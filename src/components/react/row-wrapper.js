import React from "react";
import { useBreakpoint } from "./breakpoint.js";

const FormRowWrapper = ({ dldataId, isLastRow, className, children }) => {
    const breakpoints = useBreakpoint();
    const _className = breakpoints["xs"]
        ? "-xs"
        : breakpoints["sm"]
        ? "-sm"
        : breakpoints["md"]
        ? "-md"
        : "";

    return (
        <div
            id={dldataId}
            className={
                (className || "") +
                " measures-form-row-wrapper" +
                _className +
                (!!isLastRow ? " measures-form-last-row" : "")
            }
        >
            {children}
        </div>
    );
};

export default FormRowWrapper;
