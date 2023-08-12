import React from "react";
import { useBreakpoint } from "./breakpoint.js";

const DLDataField = ({ longText, shortText }) => {
    const breakpoints = useBreakpoint();

    //let m = (datetime || "").match(/^(\d{1,2})[^0-9](\d{1,2})[^0-9](\d{4})/);
    //if (breakpoints["m1"] && m) datetime = m[1] + "-" + m[2] + "-" + m[3];

    //if (breakpoints["md"] || breakpoints["sm"] || breakpoints["xs"])
    //    return <span />;

    let text =
        breakpoints["m1"] ||
        breakpoints["m2"] ||
        breakpoints["md"] ||
        breakpoints["sm"] ||
        breakpoints["xs"]
            ? shortText || longText
            : longText;

    return <span>{text}</span>;
};

export default DLDataField;
