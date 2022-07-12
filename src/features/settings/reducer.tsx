/**
 * @description Global settings site
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */
import {
    createSlice,
    createEntityAdapter,
    createAsyncThunk,
} from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { fetchWrapper } from "tools/fetchWrapper";

export type SettingsEntity = {
    id: string;
    value: any;
};
export const fetchGetReady = createAsyncThunk("settings", async () => {
    return await fetchWrapper("/api/getready");
});
const settings: SettingsEntity[] = [{ id: "isReady", value: undefined }];

export const settingsAdapter = createEntityAdapter();
const settingsInitialState = settingsAdapter.getInitialState();
const filledState = settingsAdapter.upsertMany(settingsInitialState, settings);

const slice = createSlice({
    name: "settings",
    initialState: filledState,
    reducers: {
        setProp: settingsAdapter.setOne,
    },
    extraReducers(builder) {
        builder.addCase(fetchGetReady.fulfilled, (state, action: any) => {
            if (action.payload.ready)
                slice.caseReducers.setProp(state, {
                    id: "isReady",
                    value: true,
                });
            else
                slice.caseReducers.setProp(state, {
                    id: "isReady",
                    value: false,
                });
        });
        builder.addCase(fetchGetReady.rejected, (state) => {
            slice.caseReducers.setProp(state, {
                id: "isReady",
                value: false,
            });
        });
    },
});

export const reducerSettings = slice.reducer;
export const selectorsSettings = settingsAdapter.getSelectors(
    (state: any) => state.settings
);
export const useGetReady = () => {
    const isReady: any = useSelector((state) =>
        selectorsSettings.selectById(state, "isReady")
    );
    return isReady.value;
};
export const { setProp } = slice.actions;
