/**
 * catch intersects headers
 * additional feature: turn on / off transmit changes
 * sandbox: https://codesandbox.io/s/intersections-j0xjfb?file=/src/components/useIntersection2.js:3209-3324
 */

import React from "react";
import { useRefineHeader } from "./useHeadeRefine";
import { useLazyLoadingContentNote } from "./useLazyLoadingContentNote";

export const useIntersections = (refContainer: any) => {
    const { numberHeader, arrayHeaders, refineHeader } =
        useRefineHeader(refContainer);
    const { arrayLazyLoading, lazyLoading } = useLazyLoadingContentNote(refContainer);
    React.useEffect(() => {
        if (!refContainer || !refContainer.current) return;

        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.2,
        };

        const observer = new IntersectionObserver((entries: any[]) => {
            refineHeader(entries);
            lazyLoading(entries, observer);
        }, options);
        if (arrayHeaders instanceof Array) {
            arrayHeaders.forEach((element) => {
                observer.observe(element);
            });
        }
        if (arrayLazyLoading instanceof Array) {
            arrayLazyLoading.forEach((element) => {
                observer.observe(element);
                // console.log('add image', element)
            });
        }
    }, [refContainer.current, arrayHeaders, arrayLazyLoading]);

    return {
        number: numberHeader,
    };
};
