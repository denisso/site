export {
    reducerTheming,
    selectTheme,
    switchTheme,
    switchBreakpoint,
} from "./reducer";

export { ThemeProvider } from "./ThemeProvider";

export type { themeType } from "./themes/themeType";
export { themeLight } from "./themes/light";
export { themeDark } from "./themes/dark";

export {
    breaksNumber,
    breaksPx,
    mUp,
    mDown,
    mOnly,
} from "./themes/breakpoints";
