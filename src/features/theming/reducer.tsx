import { createSlice } from "@reduxjs/toolkit";
// import { themeDark } from "./themes/dark";
import { themeLight } from "./themes/light";
import { themeType } from "./themes/themeType";

type iState = {
    current: themeType;
};

const initialState: iState = {
    current: themeLight,
};

const slice = createSlice({
    name: "themes",
    initialState,
    reducers: {
        // toLight: (state) => {
        //     state.current = {
        //         ...themeLight,
        //         breakpoint: state.current.breakpoint,
        //     };
        // },
        // toDark: (state) => {
        //     state.current = {
        //         ...themeDark,
        //         breakpoint: state.current.breakpoint,
        //     };
        // },
        switchTheme: (state) => {
            state.current = {
                ...themeLight,
                breakpoint: state.current.breakpoint,
            };
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
