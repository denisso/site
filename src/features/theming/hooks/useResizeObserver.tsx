import { useEffect, useState } from "react";
import { breaksNumber } from "../themes/breakpoints";
var throttle = require("lodash.throttle");

let entries = Object.entries(breaksNumber);

const getMedia = (width: number) => {
    for (let i = 0; i < entries.length - 1; i++) {
        if (width < entries[i + 1][1]) return entries[i][0];
    }
    return entries[entries.length - 1][0];
};

export const useResizeObserver = () => {
    const [bp, setBp] = useState("init");
    useEffect(() => {
        // window.innerWidth from previous trigger Resize Observer
        let innerWidthPrev = 0;
        const calculate = throttle(function () {
            setBp(getMedia(window.innerWidth));
            // not implemented yet
            // if (window.innerWidth !== innerWidthPrev) {
            //     const body = document.body
            //     const doc = document.documentElement
    
            //     let width = doc.getBoundingClientRect().width
            //     // if change viewport width when modal window is open
            //     if (isShowModal) width -= scrollBarWidth
            //     body.style.width = width + "px"
            // }
    
            // innerWidthPrev = window.innerWidth
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
            const calcInnerWidth = throttle(function () {
                setBp(getMedia(window.innerWidth));
            }, 200);
            window.addEventListener("resize", calcInnerWidth);
            return () => window.removeEventListener("resize", calcInnerWidth);
        }
    }, []);
    return bp;
};
