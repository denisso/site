/**
 * 
 */
import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const MarkdownComponent = ({ markdown, className, components }: any) => {

    return (
        <div {...{ className }}>
            <ReactMarkdown
                children={markdown}
                components={components}
            />
        </div>
    );
};

export const Markdown = React.memo(MarkdownComponent)
