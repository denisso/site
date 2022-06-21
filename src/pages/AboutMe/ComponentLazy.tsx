import React from "react";
import styled from "styled-components";
import { PagesContext, PagesContextType } from "pages";

const Component = ({ className, children }: any) => {
    const { intersect }: PagesContextType = React.useContext(PagesContext);
    const componentRef = React.useRef<HTMLElement>();
    const trigger = React.useCallback(({ entity, unobserve }: any) => {
        if (!componentRef.current) return;
        if (entity.isIntersecting) {
            entity.target.classList.add("visible");
        } else {
            entity.target.classList.remove("visible");
        }
    }, []);
    const componentRefCb = React.useCallback((node: any) => {
        if (node) {
            componentRef.current = node;
            intersect.addNodes({ node, trigger });
        }
    }, []);
    if (!intersect.ready) {
        return <></>;
    }
    return (
        <div className={className} ref={componentRefCb}>
            {children}
        </div>
    );
};

export const ComponentLazy = styled(Component)`
    height: 150px;
    opacity: 0;
    transition: opacity var(--transition);
    background-color: gray;

    &.visible {
        opacity: 1;
    }
`;