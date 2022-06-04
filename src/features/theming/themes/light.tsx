import { breaksPx } from "./breakpoints";

const colors = {
    colorRoot: "#fff",
    first: "#222222",
    firstLight: "#7a7a7a",
    firstLightMore: "#dddddd",
    second: "#980000",
    secondLight: "#ff9595",
    third: "#f07e3c",
    thirdLight: "#fed196",
    thirdLightMore: "#ffedd2",
    fourth: "blue",
    fourthLight: "#88beff"
};

const header = {
    colorText: colors.first,
    colorTextMenu: colors.first,
    colorTextMenuHover: colors.firstLight,
}
// export const themeLight: themeType = {
export const themeLight = {
    name: "Light",
    colors: {...colors},
    fontFamily: "Arial, Helvetica, sans-serif",
    transition: ".4s",
    colorBackground: colors.firstLightMore,
    colorRoot: colors.colorRoot,
    colorText: colors.first,
    colorError: colors.second,
    colorBoxShadow: "rgba(0, 0, 0, .5)",
    header: { ...header},
    ui: {
        button:{
            colorDisable: colors.firstLight,
            color: colors.first,
            borderColorHover: colors.third,
            backgroundColor: colors.colorRoot,
            borderColorHoverSubmit: colors.fourth,
            backgroundColorSubmit: colors.fourthLight,
            borderdAlarm: colors.second,
            backgroundAlarm: colors.secondLight,
        },
        link:{
            color: colors.first,
            colorHover: colors.firstLight,
            bgColor: colors.firstLightMore,
            bgColorHover: colors.firstLight
        },
        input: {
            border: `1px solid ${colors.firstLightMore}`,
            boxShadow: `2px 2px 3px ${colors.firstLight}`
        },
        modal:{
            overlay: "rgba(255, 255, 255, 0.4)",
            borderColor: colors.firstLight
        }
    },
    breakpoint: "init",
    ...breaksPx,
};
