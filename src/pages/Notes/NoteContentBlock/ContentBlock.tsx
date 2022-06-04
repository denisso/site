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
import { useIntersections } from "./useIntersections";
import { ContextNotes } from "../ContextNotes";
import { ToCMobile } from "./ToCMobile";
import { themeType, mDown } from "features/theming";

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
        anchorsArrayForToc,
    }: {
        theme: themeType;
        anchorsArrayForToc: any;
        data: NoteDataType;
        className: string;
    }) => {
        const { title, description, createdAt, image, category, slug } = data;

        const [render, setRender] = React.useState(true);
        const refContainer: any = React.useRef(null);
        React.useEffect(() => {
            // work around for useIntersectionHeaders
            setRender(!render);
        }, [refContainer.current]);
        // make lazy function later
        const { number } = useIntersections(refContainer);

        const { setCurrentHeader } = React.useContext(ContextNotes);

        React.useEffect(() => {
            const clickHandle = (e: any) => {
                if (e.target.parentNode.nodeName.match(/h[1-6]/i) === null)
                    return;
                scrollTo(e.target.parentNode.offsetTop - 40);
            };
            refContainer.current.addEventListener("click", clickHandle);
            return () => {
                if (refContainer.current)
                    refContainer.current.removeEventListener(
                        "click",
                        clickHandle
                    );
            };
        }, []);

        React.useEffect(() => {
            setCurrentHeader(number);
        }, [number, setCurrentHeader]);

        return (
            <ArticleBox className={className} ref={refContainer}>
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
                />

                <hr />
                <div className="articlePublishedAt">
                    Published at: {createdAt}
                </div>

                <ToCMobile
                    anchorsArrayForToc={anchorsArrayForToc}
                    className={"TableOfContent"}
                    isVisible={mDown("md", theme.breakpoint)}
                />
            </ArticleBox>
        );
    }
);
