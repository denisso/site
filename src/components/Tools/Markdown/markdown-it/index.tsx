/**
 * @description Adapter for tmarkdown-it
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */
import React from "react";
import { md } from "./markdown-it";

const MarkdownComponent = ({ markdown, className }: any) => {
    const memoConent = React.useMemo(
        () => (markdown !== undefined ? md.render(markdown) : ""),
        [markdown]
    );
    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{
                __html: markdown,
            }}
        />
    );
};

export const Markdown = React.memo(MarkdownComponent);
