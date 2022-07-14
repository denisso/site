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
    option?: any;
};

export const fetchGetReadyServer = createAsyncThunk("settings", async () => {
    return await fetchWrapper("/api/getready");
});
const settings: SettingsEntity[] = [
    { id: "isReady", value: false },
    { id: "isReadyServer", value: false, option: { counter: 0 } },
    {
        id: "isReadyObserver",
        value: false,
    },
];

export const settingsAdapter = createEntityAdapter<SettingsEntity>();
const settingsInitialState = settingsAdapter.getInitialState();
const filledState = settingsAdapter.upsertMany(settingsInitialState, settings);

const middlewareReady = (state: any, { payload }: any) => {
    // Can't directly set isReady
    if (payload.id === "isReady") return;
    const settingsSelectors = settingsAdapter.getSelectors();
    const setting: any = settingsSelectors.selectById(state, payload.id);
    const newSettings = JSON.parse(JSON.stringify(setting));
    if (payload.value !== true) {
        if (payload.id === "isReadyServer") {
            newSettings.option.counter += 1;
            settingsAdapter.setOne(state, newSettings);
        }
        return;
    }

    newSettings.value = true;
    settingsAdapter.setOne(state, newSettings);
    const settingsArr = ["isReadyServer", "isReadyObserver"];
    for(let i = 0; i < settingsArr.length; i++){
        const settingVal: any = settingsSelectors.selectById(state, settingsArr[i]);
        if (!settingVal.value) return;
        if (i === settingsArr.length - 1) {
            settingsAdapter.setOne(state, { id: "isReady", value: true });
        }
    }
};

const middleDispatcher: any = {
    isReady: middlewareReady,
    isReadyServer: middlewareReady,
    isReadyObserver: middlewareReady,
};

const middleware = (state: any, action: any) => {
    const middlewareFunction = middleDispatcher[action?.payload?.id];
    if (typeof middlewareFunction === "function") {
        middlewareFunction(state, action);
    }
};

const slice = createSlice({
    name: "settings",
    initialState: filledState,
    reducers: {
        setProp: middleware,
    },
    extraReducers(builder) {
        builder.addCase(fetchGetReadyServer.fulfilled, (state, action: any) => {
            slice.caseReducers.setProp(state, {
                payload: {
                    id: "isReadyServer",
                    value: action.payload.ready ? true : false,
                },
            });
        });
        builder.addCase(fetchGetReadyServer.rejected, (state) => {
            slice.caseReducers.setProp(state, {
                payload: {
                    id: "isReadyServer",
                    value: false,
                },
            });
        });
    },
});

export const reducerSettings = slice.reducer;
const settingsSelectors = settingsAdapter.getSelectors(
    (state: any) => state.settings
);
export const useGetReady = () => {
    const isReady: any = useSelector((state) =>
        settingsSelectors.selectById(state, "isReady")
    );
    return isReady.value;
};
export const useGetReadyServer = () => {
    const isReadyServer: any = useSelector((state) =>
        settingsSelectors.selectById(state, "isReadyServer")
    );
    return {
        value: isReadyServer.value,
        counter: isReadyServer.option.counter,
    };
};
export const { setProp } = slice.actions;
