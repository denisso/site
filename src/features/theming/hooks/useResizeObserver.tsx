import React from "react";
import { useDispatch } from "react-redux";
import { switchBreakpoint } from "../reducer";
var throttle = require("lodash.throttle");

export const useResizeObserver = () => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        const calculate = throttle(function () {
            dispatch(switchBreakpoint())
        }, 200);
        if (window.ResizeObserver) {
            const resizeObserver = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    if (entry.contentBoxSize) {
                        calculate();
                    }
                }
            });

            resizeObserver.observe(document.documentElement);
        } else {
            window.addEventListener("resize", calculate);
            return () => window.removeEventListener("resize", calculate);
        }
    }, []);
};
