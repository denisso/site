import { useEffect, useState } from "react";
import { breaksNumber } from "../themes/breakpoints";
var throttle = require("lodash.throttle");

let entries = Object.entries(breaksNumber);

const getMedia = (width: number) => {
    for (let i = 0; i < entries.length - 1; i++) {
        if (width < entries[i + 1][1])
            return entries[i][0];
    }
    return entries[entries.length - 1][0];
};

export const useBreakpoint = () => {
    const [bp, setBp] = useState("init");
    useEffect(() => {
        const calculate = throttle(function () {
            setBp(getMedia(window.innerWidth))
        }, 200);
        if (window.ResizeObserver) {
            const resizeObserver = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    if (entry.contentBoxSize) {
                        calculate()
                    }
                }
            });

            resizeObserver.observe(document.documentElement);
        } else {
            const calcInnerWidth = throttle(function () {
                setBp(getMedia(window.innerWidth));
            }, 200);
            window.addEventListener("resize", calcInnerWidth);
            return () => window.removeEventListener("resize", calcInnerWidth);
        }
    }, []);
    return bp;
};
