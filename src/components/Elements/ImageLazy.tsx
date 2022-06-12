import React from "react";
import { PagesContext } from "pages";
import styled from "styled-components";

const Image = styled.img`
    opacity: 0;
    transition: opacity var(--transition);
    &[src] {
        opacity: 1;
    }
`;
export const ImageLazy = ({ src, alt, width, height, ...props }: any) => {
    const { intersect } = React.useContext(PagesContext);
    const node = React.useRef<HTMLElement>();
    const [loaded, setLoaded] = React.useState(false);

    const attrs = React.useMemo(() => {
        let attrs: any = {};
        if (alt && typeof alt == "string") {
            if (alt.match(/^{.+}$/g)) {
                try {
                    attrs = JSON.parse(alt);
                } catch (err: any) {}
            } else {
                attrs = { alt };
            }
        }
        if (Number.isInteger(width)) attrs.width = width;
        if (Number.isInteger(height)) attrs.height = height;

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
        <Image
            ref={onLoad}
            {...(loaded ? { src } : {})}
            {...props}
            {...attrs}
        />
    );
};
