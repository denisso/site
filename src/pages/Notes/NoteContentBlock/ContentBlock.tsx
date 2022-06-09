/**
 * Component for displays only content post
 * additional feature: this component source of truth for the currently displayed header
 * current header stored in context "ContextNotes" as number
 */

import React from "react";
import { NoteDataType } from "mocks/db-notes";
import { scrollTo } from "components/Tools";
import styled, { withTheme } from "styled-components";
import { Markdown } from "components/Tools/Markdown";
import { ContextNotes } from "../ContextNotes";
// import { NavHeadersDesktop } from "./NavHeadersMobile";
// import { NavHeadersDesktop } from "./NavHeadersDesktop"
import { themeType, mDown } from "features/theming";
import { useHeadersReducer } from "./useHeadersReducer";

const ArticleBox = styled.div`
    line-height: 1.5rem;
    .articleTitle {
        font-size: 2rem;
        text-align: center;
        margin: 1rem 0;
        font-weight: bold;
    }
    .articlePublishedAt {
        font-weight: bold;
    }
    hr {
        display: block;
        width: 50%;
        margin: 1rem auto;
    }
    img {
        display: block;
        max-width: 100%;
        height: auto;
        margin: 0.5rem auto;
    }
    .articleContent {
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            padding: 60px 0 1rem;
        }

        a:hover:after {
            content: "#";
        }
    }
`;

/**
 *
 * Container for display content in markdown format
 */
export const ContentBlock: React.FC<any> = withTheme(
    ({
        theme,
        data,
        className,
    }: {
        theme: themeType;
        data: NoteDataType;
        className: string;
    }) => {
        const { title, description, createdAt, image } = data;
        const { setCurrentHeader, addNodes, removeNodes, refHeaders } =
            React.useContext(ContextNotes);
        const { state, dispatch } = useHeadersReducer();

        React.useEffect(() => {
            setCurrentHeader(state.value);
        }, [state]);

        React.useEffect(() => {
            return () => {
                refHeaders.current.forEach((e: any) => removeNodes(e));
                refHeaders.current = [];
            };
        }, []);
        // get intersection entry from intersection observer
        const handleHeader = React.useCallback(
            ({ entity }) => {
                const indxTriggered = refHeaders.current.indexOf(entity.target);
                dispatch({
                    type: "changeCurrentHeader",
                    payload: { indxTriggered, entity },
                });
            },
            [dispatch]
        );
        // add nodes header to use intersect hook
        const addHeaderNodeToIntersect = React.useCallback(
            (node) => {
                if (node) {
                    addNodes({ node, trigger: handleHeader });
                    refHeaders.current.push(node);
                }
            },
            [addNodes, handleHeader, refHeaders]
        );
        const markdownComponents = React.useMemo(() => {
            const headerParser = ({
                node,
                className,
                children,
                ...props
            }: any) => {
                const a = node.children.find(
                    (e: any) => e.tagName.toUpperCase() === "a".toUpperCase()
                );

                if (!a) {
                    return (
                        <node.tagName {...props} {...{ className }}>
                            {children}
                        </node.tagName>
                    );
                }

                const hrefId =
                    a.properties["href"][0] === "#"
                        ? a.properties["href"].slice(1)
                        : a.properties["href"];
                const { id } = props;

                return (
                    <node.tagName
                        ref={addHeaderNodeToIntersect}
                        {...props}
                        {...{ className }}
                        id={`${id || ""} ${hrefId || ""}`.trim()}
                    >
                        {children}
                    </node.tagName>
                );
            };
            return {
                h1: headerParser,
                h2: headerParser,
                h3: headerParser,
                h4: headerParser,
                h5: headerParser,
                h6: headerParser,
                img({ node, className, children, ...props }: any) {
                    const { src, alt, ...other } = props;
                    return (
                        <img
                            data-src={src}
                            alt={alt}
                            {...other}
                            {...{ className }}
                        />
                    );
                },
            };
        }, [handleHeader, addHeaderNodeToIntersect]);

        return (
            <ArticleBox
                className={className}
                ref={(node) => {
                    if (node)
                        dispatch({
                            type: "ready",
                            payload: {
                                countHeaders: refHeaders.current.length,
                            },
                        });
                }}
            >
                <div className="articleTitle">{title}</div>
                <hr />
                {/* For demo */}
                <img
                    src={`https://picsum.photos/id/${image.src.match(
                        /\d+/
                    )}/500/300`}
                    alt=""
                    width="500"
                    height="300"
                />

                <Markdown
                    markdown={description}
                    className="articleContent"
                    components={markdownComponents}
                />

                <hr />
                <div className="articlePublishedAt">
                    Published at: {createdAt}
                </div>

                {/* <ToCMobile
                    anchorsArrayForToc={anchorsArrayForToc}
                    className={"TableOfContent"}
                    isVisible={mDown("md", theme.breakpoint)}
                /> */}
                {/* <ToCDesctop
                    anchorsArrayForToc={anchorsArrayForToc}
                    className={"TableOfContent"}
                    isVisible={mUp("md", theme.breakpoint)}
                /> */}
            </ArticleBox>
        );
    }
);
