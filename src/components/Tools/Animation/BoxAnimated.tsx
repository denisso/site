/**
 * @description
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */
import React from "react";
import styled from "styled-components";

const useAnimateBlocks = (refBlock: any) => {
    const animationInterval: any = React.useRef(null);
    React.useEffect(() => {
        if (!refBlock.current) return;
        const items: NodeListOf<any> = refBlock.current.childNodes;

        const content: any[] = [];

        items.forEach((element: any) => {
            content.push(element.childNodes[0]);
        });

        for (var i = 0; i < items.length; i++) {
            content[i].style.width = items[i].offsetWidth + "px";
            content[i].style.height = items[i].offsetHeight + "px";
            content[i].style.top =
                items[i].offsetTop - content[i].offsetTop + "px";
            content[i].style.left =
                items[i].offsetLeft - content[i].offsetLeft + "px";
        }
        const timeout = 200;

        const animEasy = (attrName: string, offsetName: string, i: number) => {
            content[i].style[attrName] = items[i][offsetName] + "px";
        };
        if (animationInterval.current !== null) {
            clearInterval(animationInterval.current);
            animationInterval.current = null;
        }

        animationInterval.current = setInterval(() => {
            items.forEach((e, i) => {
                animEasy("width", "offsetWidth", i);
                animEasy("top", "offsetTop", i);
                animEasy("left", "offsetLeft", i);
            });
        }, timeout);
    }, [refBlock]);
};
const Content = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    transition: top var(--transition), left var(--transition),
        width var(--transition);
`;

export const ItemAnimated = ({ children, className }: any) => {
    const arrayComponents = React.Children.toArray(children);
    return (
        <div {...{ className }}>
            {React.Children.map(
                arrayComponents,
                (child: any, index: number) => {
                    return (
                        <Content>
                            <child.type
                                {...child.props}
                                key={index}
                                index={index}
                            >
                                {child.props.children}
                            </child.type>
                        </Content>
                    );
                }
            )}
        </div>
    );
};

export const BoxAnimated = ({ children, className }: any) => {
    const refParentBox: any = React.useRef<any>(null);
    useAnimateBlocks(refParentBox);
    return (
        <div
            {...{ className }}
            ref={refParentBox}
            style={{ position: "relative" }}
        >
            {children}
        </div>
    );
};
