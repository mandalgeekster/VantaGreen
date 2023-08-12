import React from "react";

import { useBreakpoint } from "./breakpoint.js";
 
import SVG from "react-inlinesvg";

const Logo = () => <SVG src="logo.svg" />;

const Header = ({ children }) => {
    const breakpoints = useBreakpoint();
    const display = breakpoints["xs"] || breakpoints["sm"] ? "none" : "block";

    return (
        <div style={{ display: display }} className="header">
            <a href="!#" id="menu-action">
                <span>
                    <Logo />
                </span>
            </a>
        </div>
    );
};

export default Header;
