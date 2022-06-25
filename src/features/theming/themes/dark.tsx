import { createThemeSchema, colorsType } from "./themeSchema";

const colors: colorsType = {
    colorRoot: "#5a5a5a",
    first: "#ffffff",
    firstLight: "#7a7a7a",
    firstLightMore: "#353535",
    second: "#fdbfbf",
    secondLight: "#fd4242",
    secondLightMore: "#980000",
    third: "#ffedd2",
    thirdLight: "#ffb657",
    thirdLightMore: "#ff5d1c",
    fourth: "#6d6dff",
    fourthLight: "#0059c5",
    fourthLightMore: "#000280",
    shadow: "rgba(0, 0, 0, .5)",
    overlay: "rgba(255, 255, 255, 0.4)",
};

export const themeDark = createThemeSchema({ colors });