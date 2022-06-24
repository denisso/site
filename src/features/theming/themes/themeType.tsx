import { colorsType } from "./themeSchema";

export type themeType = {
    colors: colorsType;
    fontFamily: string;
    transition: string;
    colorBackground: string;
    colorRoot: string;
    colorText: string;
    colorError: string;
    colorBoxShadow: string;
    header: {
        colorText: string;
        colorTextMenu: string;
        colorTextMenuHover: string;
    };
    ui: {
        button: {
            colorDisable: string;
            color: string;
            borderColorHover: string;
            backgroundColor: string;
            borderColorHoverSubmit: string;
            backgroundColorSubmit: string;
            borderdAlarm: string;
            backgroundAlarm: string;
        };
        link: {
            color: string;
            colorHover: string;
            bgColor: string;
            bgColorHover: string;
        };
        input: {
            border: string;
            boxShadow: string;
        };
        modal: {
            overlay: string;
            borderColor: string;
        };
    };
    breakpoint: string;
    "styled-breakpoints": { [key: string]: any };
};
