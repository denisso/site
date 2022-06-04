import { themeType } from "./themeType";
import { breaksPx } from "./breakpoints";

export const themeDark: themeType = {
    name: "Dark",
    colorText: "#4C4C4C",
    colorBorder: "red",
    colorBackground: "black",
    breakpoint: "init",
    ...breaksPx,
};
