import React from "react";
import { PagesContext } from "pages";
import { Spinner } from "./Spinner";

export const ImageLazy = ({ src, alt, width, height, ...props }: any) => {
    const { intersect } = React.useContext(PagesContext);
    const node = React.useRef<HTMLElement>();
    const [loaded, setLoaded] = React.useState(false);

    const attrs = React.useMemo(() => {
        let attrs: any = {};
        try {
            if (alt) {
                if (typeof alt == "object") {
                    attrs = JSON.parse(alt);
                } else {
                    if (typeof alt == "string") attrs = { alt };
                    if (Number.isInteger(width)) attrs.width = width;
                    if (Number.isInteger(height)) attrs.height = height;
                }
            }
        } catch (err: any) {}
        return attrs;
    }, []);
    const trigger = React.useCallback(({ entity, unobserve }) => {
        if (!node.current || !entity.isIntersecting) return;
        setLoaded(true);
        unobserve();
    }, []);
    const onLoad = React.useCallback((nodeImg) => {
        if (nodeImg) {
            node.current = nodeImg;
            intersect.addNodes({ node: node.current, trigger });
        }
    }, []);
    React.useEffect(() => {
        return () => {
            intersect.removeNodes(node.current);
        };
    }, []);
    return (
        <>
            {!loaded && <Spinner />}
            <img ref={onLoad} src={loaded ? src : ""} {...props} {...attrs} />
        </>
    );
};
