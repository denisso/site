import React from "react";
import { PagesContext } from "pages";
import styled from "styled-components";

const Image = ({ src, alt, width, height, ...props }: any) => {
    const { intersect } = React.useContext(PagesContext);
    const node = React.useRef<HTMLElement>();
    const [isIntersecting, setIntersecting] = React.useState(false);

    const attrs = React.useMemo(() => {
        let attrs: any = {};
        if (typeof alt == "string") {
            if (alt.match(/^{.+}$/g)) {
                try {
                    attrs = JSON.parse(alt);
                } catch (err: any) {}
            } else {
                attrs = { alt };
            }
        }
        if (!isNaN(width)) attrs.width = width;
        if (!isNaN(height)) attrs.height = height;

        return attrs;
    }, []);
    const trigger = React.useCallback(({ entity, unobserve }: any) => {
        if (!node.current || !entity.isIntersecting) return;
        setIntersecting(true);
        unobserve();
    }, []);

    const onLoadRef = React.useCallback((nodeImg: any) => {
        if (nodeImg && !node.current) {
            node.current = nodeImg;
            intersect.addNodes({ node: node.current, trigger });
        }
    }, []);
    React.useEffect(() => {
        return () => {
            intersect.removeNodes(node.current);
        };
    }, []);
    const onError = React.useCallback(() => {
        node.current?.classList.add("notloaded");
    }, []);
    const onLoad = React.useCallback(() => {
        node.current?.classList.add("loaded");
    }, []);
    if(!intersect.ready){
        return <></>
    }
    return (
        <img
            ref={onLoadRef}
            {...(isIntersecting ? { src } : {})}
            {...props}
            {...attrs}
            onLoad={onLoad}
            onError={onError}
        />
        
    );
};

export const ImageLazy = styled(Image)`
    opacity: 0;
    transition: opacity var(--transition);
    &.loaded {
        opacity: 1;
    }
    &.notloaded {
        opacity: 1;
        border: solid;
        background: no-repeat center url(/asset/imageLoadingProblem.svg);
    }
`;
