import React from "react";
import styled from "styled-components";
import { PagesContext, PagesContextType } from "pages";

const Wrapper = styled.div`
    display: flex;
    min-height: 150px;
    opacity: 0;
    transition: opacity var(--transition);
    > .LeftSide,
    > .RightSide {
        width: 1rem;
        border: solid;
        border-color: transparent;
        transition: border-color var(--transition);
    }
    > .LeftSide {
        border-right: none;
    }

    > .RightSide {
        border-left: none;
    }

    &:hover .LeftSide,
    &:hover .RightSide {
        border-color: ${({ theme }) => theme.colors.third};
    }
    &.visible {
        opacity: 1;
    }
    > .Children {
        padding: 1rem 0;
        flex: 1;
    }
`;

export const ComponentLazy = ({ className, children }: any) => {
    const { intersect }: PagesContextType = React.useContext(PagesContext);
    const componentRef = React.useRef<HTMLElement>();
    const visible = React.useRef<boolean>(false);
    const trigger = React.useCallback(({ entity, unobserve }: any) => {
        if (!componentRef.current) return;
        if (entity.isIntersecting) {
            visible.current = true;
            entity.target.classList.add("visible");
        } else {
            visible.current = false;
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
        <Wrapper className={className} ref={componentRefCb}>
            <div className="LeftSide"></div>
            <div className="Children">{children}</div>
            <div className="RightSide"></div>
        </Wrapper>
    );
};
