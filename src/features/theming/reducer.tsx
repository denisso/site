import { createSlice } from "@reduxjs/toolkit";
import { breaksNumber } from "./themes/breakpoints";
import { themeDark } from "./themes/dark";
import { themeLight } from "./themes/light";
import { themeType } from "./themes/themeType";



type iState = {
    current: themeType;
};

const initialState: iState = {
    current: themeLight,
};

const Themes: {[key:string]:themeType} = {
    "Light": themeLight,
    "Dark": themeDark,
};

const getMedia = () => {
    const entries = Object.entries(breaksNumber);
    const width:number = window.innerWidth
    for (let i = 0; i < entries.length - 1; i++) {
        if (width < entries[i + 1][1]) return entries[i][0];
    }
    return entries[entries.length - 1][0];
};

const slice = createSlice({
    name: "themes",
    initialState,
    reducers: {
        /**
         * 
         * @param state 
         * @param action { payload: { themeName: "Light" | "Dark" } }
         */
        switchTheme: (
            state,
            action: { payload: { themeName: string } }
        ) => {
            if(Themes[action?.payload?.themeName]){
                state.current = {
                    ...Themes[action?.payload?.themeName],
                    breakpoint: state.current.breakpoint,
                };
            }
        },
        toggleModal: (state, action) => {

        },
        switchBreakpoint: (state) => {
            state.current.breakpoint = getMedia();
        },
    },
});

type StateThemes = {
    themes: iState;
};

export const reducerTheming = slice.reducer;
export const selectTheme = (state: StateThemes): themeType => {
    return state.themes.current;
};
export const { switchTheme, switchBreakpoint } = slice.actions;
