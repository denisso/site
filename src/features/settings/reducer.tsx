/**
 * Not implemented yet
 */
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

type Settings = {
    id: string;
    value: any;
};

const settings: Settings[] = [{ id: "setting1", value: "value 1" }];

export const settingsAdapter = createEntityAdapter();
const settingsInitialState = settingsAdapter.getInitialState();
const filledState = settingsAdapter.upsertMany(settingsInitialState, settings);

const slice = createSlice({
    name: "settings",
    initialState: filledState,
    reducers: {
        setSiteProp: settingsAdapter.setOne,
    },
});

export const reducerSettings = slice.reducer;
export const selectorsSettings = settingsAdapter.getSelectors();
export const { setSiteProp } = slice.actions;
