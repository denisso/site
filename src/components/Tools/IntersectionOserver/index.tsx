import React from "react";

export const useIntersection = () => {
    const refArrayNodes = React.useRef(new Map());
    const refObserver = React.useRef<any>(null);

    React.useEffect(() => {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.2,
        };
        refObserver.current = new IntersectionObserver((entries) => {
            for (let indx = 0; indx < entries.length; indx++) {
                const { isIntersecting, target } = entries[indx];
                if (refArrayNodes.current.has(target)) {
                    const trigger = refArrayNodes.current.get(target);
                    if (trigger) {
                        trigger({
                            node: target,
                            isIntersecting,
                            unobserve: () => {
                                refObserver.current.unobserve(target);
                            },
                        });
                    }
                }
            }
        }, options);
    }, [refObserver]);

    const addNodes = React.useCallback(
        ({ node, trigger }) => {
            refObserver.current.observe(node);
            if (node !== null) refArrayNodes.current.set(node, trigger);
        },
        [refArrayNodes, refObserver]
    );

    const removeNodes = React.useCallback(
        (node) => {
            refObserver.current.unobserve(node);
            if (refArrayNodes.current.has(node)) {
                refArrayNodes.current.delete(node);
            }
        },
        [refArrayNodes]
    );
    return {
        addNodes,
        removeNodes,
    };
};
