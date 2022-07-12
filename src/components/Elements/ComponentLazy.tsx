/**
 * @description
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */
import React from "react";
import styled from "styled-components";
import { PagesContext, PagesContextType } from "pages";

const Wrapper = styled.div`
    display: flex;
    min-height: 150px;
    transform: translateY(50px);
    opacity: 0;
    transition: transform 1s, opacity 1s;
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
        transform: translateY(0px);
        opacity: 1;
    }
    > .Children {
        padding: 1rem 0;
        flex: 1;
    }
`;

export const ComponentLazy = React.memo(({ className, children }: any) => {
    const { intersect }: PagesContextType = React.useContext(PagesContext);
    const componentRef = React.useRef<HTMLElement>();
    const [visible, setVisible] = React.useState(false);
    const trigger = React.useCallback(({ entity, unobserve }: any) => {
        if (!componentRef.current) return;
        if (entity.isIntersecting) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, []);
    React.useEffect(() => {
        return () => {
            if (componentRef.current) {
                intersect.removeNodes(componentRef.current);
            }
        };
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
        <Wrapper
            className={
                (visible ? "visible" : "") + (className ? " " + className : "")
            }
            ref={componentRefCb}
        >
            <div className="LeftSide"></div>
            <div className="Children">{children}</div>
            <div className="RightSide"></div>
        </Wrapper>
    );
});
