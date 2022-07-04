/**
 * Author mr_dramm
 * Plugin for markdown-it for:
 * - add id to h1-h6
 * - swap src to data-src in image ang iframe
 * For more info about markdown-it:
 * https://markdown-it.github.io/
 * https://github.com/markdown-it/markdown-it
 * https://markdown-it.github.io/markdown-it/
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */
const { XMLParser } = require("fast-xml-parser");
export const md = require("markdown-it")()
    .set({ html: true, breaks: true })
    .use(plugin);

function plugin(md: any) {
    md.core.ruler.push("additional-parser", entryPoint.bind(null, md));
}

const parseContent = (tokens: any[]) => {
    tokens.forEach((token: any, indx: number) => {
        switch (true) {
            case token.type === "heading_open":
                /**
                 * add id in h1-h6 html tag
                 */
                const nextToken = tokens[indx + 1];
                const nextTokenChildren: any = tokens[indx + 1].children[0];
                if (
                    nextToken.type === "inline" &&
                    nextTokenChildren.type === "link_open"
                ) {
                    setAttr(
                        tokens[indx],
                        "id",
                        nextTokenChildren.attrs[0][1].slice(1)
                    );
                }
                break;
            case token.type === "html_inline":
                /**
                 * swap attribute src to data-src in html tags img and iframe
                 * before swap
                 * <img src="https://picsum.photos/id/1/200/300" alt="some alt">
                 * after swap
                 * <img src=""# data-src="https://picsum.photos/id/1/200/300" alt="some alt">
                 */
                const parser = new XMLParser({
                    ignoreAttributes: false,
                    attributeNamePrefix: "",
                });
                const elemDOMParsed: any = parser.parse(token.content);
                const tagName: string = Object.keys(elemDOMParsed)[0];
                const arr: Array<string> = ["img", "iframe"];
                const readyForSwap: boolean = arr.includes(tagName);
                if (readyForSwap) {
                    token.content = `<${tagName}`;
                    for (const [attr, value] of Object.entries(
                        elemDOMParsed[tagName]
                    )) {
                        if (attr === "src") {
                            token.content += ` src="#" data-src="${value}"`;
                        } else token.content += ` ${attr}="${value}"`;
                    }

                    token.content += ` lazy="true">`;
                }
                break;

            case token.type === "image":
                /**
                 * swap attribute src to data-src in markdown element image
                 * before swap
                 * ![alt text](https://picsum.photos/id/1/200/300)
                 * after swap
                 * <img src=""# data-src="https://picsum.photos/id/1/200/300" alt="some alt">
                 */
                const src = token.attrGet("src");
                if (src === null) {
                    return;
                }
                setAttr(token, "src", "#");
                setAttr(token, "data-src", src);
                setAttr(token, "lazy", "true");
                break;
            default:
        }
        if (token.children) parseContent(token.children);
    });
};

function entryPoint(md: any, state: any) {
    parseContent(state.tokens);
}

function setAttr(token: any, attr: string, value: string, options?: any) {
    /**
     * Format attrs: Array< Array <string> >
     * ["indx attr"]["indx 0 key", "indx 1 value"]
     */
    var idx = token.attrIndex(attr);

    if (idx === -1) {
        // add a nonexistent attribute
        token.attrPush([attr, value]);
    } else if (options && options.append) {
        // for example {append: true}
        // for example we want add another one class
        // class="one" after addition bacome "one two"
        token.attrs[idx][1] = token.attrs[idx][1] + " " + value;
    } else {
        // set new value - replacing the old value with the new one
        token.attrSet(attr, value);
    }
}
