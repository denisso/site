import { createThemeSchema, colorsType } from "./themeSchema";

const colors: colorsType = {
    colorRoot: "#5a5a5a",
    first: "#ffffff",
    firstLight: "#7a7a7a",
    firstLightMore: "#353535",
    second: "#980000",
    secondLight: "#ff9595",
    secondLightMore: "#fdbfbf",
    third: "#3cf045",
    thirdLight: "#fed196",
    thirdLightMore: "#ffedd2",
    fourth: "#0000FF",
    fourthLight: "#88beff",
    fourthLightMore: "#cee4ff",
    shadow: "rgba(0, 0, 0, .5)",
    overlay: "rgba(255, 255, 255, 0.4)",
};

export const themeDark = createThemeSchema({ colors });