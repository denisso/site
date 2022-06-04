import React from "react";
export const useLazyLoadingContentNote = (refContainer: any) => {
    const arrayLazyLoading = React.useMemo(() => {
        if (refContainer.current === null) return [];
        const NodeListOfElement: NodeListOf<Element> =
            refContainer.current.querySelectorAll("img, iframe");

        return Array.from(NodeListOfElement);
    }, [refContainer.current]);

    const lazyLoading = React.useMemo(() => {
        return (entries: any[], observer: any) => {
            entries.forEach((entry: any) => {
                let indx = arrayLazyLoading.indexOf(entry.target);
                // console.log("lazyLoading image", entry.target);
                if (indx === -1) return;
                if (entry.isIntersecting) {
                    setTimeout(() => swapSrc(entry.target), 0);
                    // observer.unobserve(entry.target);
                }
            });
        };
    }, [arrayLazyLoading]);
    return { arrayLazyLoading, lazyLoading };
};

const swapSrc = (element: any) => {
    const src = element.getAttribute("data-src");
    if (src) {
        element.setAttribute("src", src);
        element.removeAttribute("data-src");
    }
};
