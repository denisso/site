/**
 * 
 */
import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const MarkdownComponent = ({ markdown, className, callback }: any) => {
    console.log("callback", callback)
    return (
        <div {...{ className }}>
            <ReactMarkdown
                children={markdown}
                components={callback}
            />
        </div>
    );
};

export const Markdown = React.memo(MarkdownComponent)
