/**
 * Component for displays only content post
 * additional feature: this component source of truth for the currently displayed header
 * current header stored in context "ContextNotes" as number
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import React from "react";
import { NoteDataType } from "mocks/data/notes";
import styled from "styled-components";
import { Markdown } from "components/Tools/Markdown";
import { ContextNotes } from "../ContextNotes";
import { useHeadersReducer } from "./useHeadersReducer";
import { PagesContext } from "pages";
import { ImageLazy } from "components/Elements/ImageLazy";
import { scrollContent } from "components/Tools";
import { createSlug } from "tools/createSlug";
import { uid } from "tools/uid";
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
        ul {
            margin-left: 2rem;
        }
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
export const BlockContent = ({
    data,
    className,
}: {
    data: NoteDataType;
    className: string;
}) => {
    const { title, content, createdAt, image } = React.useMemo(() => data, []);
    const { setCurrentHeader, refHeaders } = React.useContext(ContextNotes);
    const { intersect } = React.useContext(PagesContext);
    const { state, dispatch } = useHeadersReducer();
    const [contentReady, setReady] = React.useState(false);
    // changing the index current header when scrolling
    React.useEffect(() => {
        setCurrentHeader(state.value);
    }, [state]);

    // unmount component and remove nodes from intersector observer
    React.useEffect(() => {
        return () => {
            refHeaders.current.forEach((e: any) => intersect.removeNodes(e));
            refHeaders.current = [];
            setCurrentHeader(-1);
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
    const addNodeToIntersect = React.useCallback((node) => {
        if (node) {
            intersect.addNodes({ node, trigger: handleHeader });
            refHeaders.current.push(node);

        }
    }, []);

    // components for markdown
    const markdownComponents = React.useMemo(() => {
        const setSlugs = new Set();

        // case ## header (default)
        const childrenText = ({ node, className, children, props }: any) => {
            let slug = createSlug(node.children[0].value);
            if (setSlugs.has(slug)) {
                slug += `-${uid()}`;
            }
            setSlugs.add(slug);

            return (
                <node.tagName
                    ref={addNodeToIntersect}
                    {...props}
                    {...{ className }}
                    id={slug}
                >
                    <a href={`#${slug}`}>{node.children[0].value}</a>
                </node.tagName>
            );
        };
        const childrenAHREF = ({ node, className, children, props }: any) => {
            let text = node.children[0]?.props?.children[0];
            let href = node.children[0]?.props?.href;
            let id = href === "#" ? href.slice(1) : href;
            if (setSlugs.has(id)) {
                id += `-${uid()}`;
            }
            setSlugs.add(id);
            return (
                <node.tagName
                    ref={addNodeToIntersect}
                    {...props}
                    {...{ className }}
                    id={id}
                >
                    <a href={href}>{text}</a>
                </node.tagName>
            );
        };
        const headerParser = ({ node, className, children, ...props }: any) => {
            try {
                // case ##
                if (node.children.length === 0) return <></>;
                // case ## header (default)
                if (node.children[0].type === "text")
                    return childrenText({ node, className, children, props });
                // case ## [Header 1](#anchor-for-url-1)
                if (node.children[0].type === "a")
                    return childrenAHREF({ node, className, children, props });
            } catch (err) {}
            // for other case
            return <></>;
        };
        return {
            h1: headerParser,
            h2: headerParser,
            h3: headerParser,
            h4: headerParser,
            h5: headerParser,
            h6: headerParser,
            img({ node, ...props }: any) {
                return <ImageLazy {...props} />;
            },
        };
    }, []);

    return (
        <ArticleBox
            className={className}
            ref={(node: any) => {
                if (node && !contentReady) {
                    dispatch({
                        type: "ready",
                        payload: {
                            headers: refHeaders,
                        },
                    });
                    setReady(true);
                    const loation = window.location || document.location;
                    if (loation.hash) {
                        try {
                            const $lement = document.querySelector(
                                loation.hash
                            );
                            if ($lement) {
                                scrollContent(
                                    $lement.getBoundingClientRect().top
                                );
                            }
                        } catch (e) {}
                    }
                }
            }}
        >
            <div className="articleTitle">{title}</div>
            <hr />
            {/* For demo */}
            <ImageLazy
                src={`https://picsum.photos/id/${image.src.match(
                    /\d+/
                )}/500/300`}
                alt="Hero image"
                width="500"
                height="300"
            />

            <Markdown
                markdown={content}
                className="articleContent"
                components={markdownComponents}
            />

            <hr />
            <div className="articlePublishedAt">
                Create at: {new Date(createdAt).toUTCString()}
            </div>
        </ArticleBox>
    );
};
