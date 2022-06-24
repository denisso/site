import { createSlice } from "@reduxjs/toolkit";
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
        switchBreakpoint: (state, action) => {
            state.current.breakpoint = action.payload;
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
