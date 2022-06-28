/**
 * 
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducerTheming } from "features/theming/reducer";
import { reducerAccount } from "features/accounts/reducer";
import { reducerSettings } from "features/settings/reducer";
import { apiQuery } from "api-query";
import { initStore } from "./initStore";
const rootReducer = combineReducers({
    themes: reducerTheming,
    account: reducerAccount,
    settings: reducerSettings,
    [apiQuery.reducerPath]: apiQuery.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiQuery.middleware),
});

initStore(store);
