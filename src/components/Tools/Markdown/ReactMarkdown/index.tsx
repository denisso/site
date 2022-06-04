/**
 * 
 */
import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const MarkdownComponent = ({ markdown, className }: any) => {

    const headerParser = React.useCallback(
        ({ node, className, children, ...props }: any) => {

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
                    {...props}
                    {...{ className }}
                    id={`${id || ""} ${hrefId || ""}`.trim()}
                >
                    {children}
                </node.tagName>
            );
        },
        []
    );

    const ReactMarkdownMemo = React.useMemo(() => {
        const ComponentConstructor = () => (
            <ReactMarkdown
                children={markdown}
                components={{
                    h1: headerParser,
                    h2: headerParser,
                    h3: headerParser,
                    h4: headerParser,
                    h5: headerParser,
                    h6: headerParser,
                    img({ node, className, children, ...props }) {
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
                }}
            />
        );
        return ComponentConstructor;
    }, []);
    return (
        <div {...{ className }}>
            <ReactMarkdownMemo />
        </div>
    );
};

export const Markdown = React.memo(MarkdownComponent)
