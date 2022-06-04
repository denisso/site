/**
 * Global intersection observer
 * not uses yet
 */
import React from "react";

const options = {
    rootMargin: "0px",
    threshold: 0.5,
};

export const useInersectionObserver = ({
    root = null,
    entries = [],
    options,
}: {
    root: any | null;
    entries: any | any[];
    options: {
        rootMargin?: string;
        threshold?: number | number[];
    };
}) => {
    const [entity, SetEntity] = React.useState();
    React.useEffect(() => {
        const optionsRes = {
            root: root ? root.current : null,
            rootMargin: options.rootMargin
                ? options.rootMargin
                : options.rootMargin,
            threshold: options.threshold
                ? options.threshold
                : options.threshold,
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    console.log(entry);
                }
            });
        }, optionsRes);

        entries.forEach((e: any) => {
            observer.observe(e.current);
        });
    }, [root, entries, options]);
    return entity;
};
