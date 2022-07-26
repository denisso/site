/**
 * @description Manage users
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiQueryAccounts } from "./apiQuery";
import { fetchWrapper } from "tools/fetchWrapper";

export const postUserCredentials = createAsyncThunk(
    "account",
    async (credentials: any) => {
        const fetch_options = {
            method: "POST",
            body: JSON.stringify(credentials),
        };
        return await fetchWrapper("/api/login", fetch_options);
    }
);

export type CredentialsType = {
    [key: string]: {
        email: string;
        name: string;
        picture: string;
    };
};

type initialStateType = {
    isSignIn: boolean;
    users: CredentialsType;
    currentUserID: string | undefined;
    isServerVerifiedUser: boolean;
};

const initialState: initialStateType = {
    isSignIn: false,
    users: {
        guest: {
            name: "Ghost",
            email: "guest@guestmail.com",
            picture: "/asset/guest.svg",
        },
    },
    currentUserID: "guest",
    isServerVerifiedUser: false,
};

const slice = createSlice({
    name: "account",
    initialState,
    reducers: {
        getUsers: (state, action) => {
            state.users = action.payload;
        },
        signIn: (state, action) => {
            state.isSignIn = true;
            state.currentUserID = action.payload.id;
            state.users[action.payload.id] = action.payload;
        },
        signOut: (state) => {
            state.isSignIn = false;
            state.currentUserID = "guest";
        },
    },
    extraReducers(builder) {
        builder.addCase(postUserCredentials.fulfilled, (state, action) => {
            state.isServerVerifiedUser = true;
        });
        builder.addCase(postUserCredentials.rejected, (state) => {
            state.isServerVerifiedUser = false;
        });
        builder.addMatcher(
            apiQueryAccounts.endpoints.getUsers.matchFulfilled,
            (state: any, { payload }: any) => {
                slice.caseReducers.getUsers(state, {
                    payload,
                    type: "getUsers",
                });
            }
        );
        builder.addMatcher(
            apiQueryAccounts.endpoints.getUsers.matchRejected,
            () => {
                console.error(
                    "apiQueryAccounts.endpoints.getUsers matchRejected:"
                );
            }
        );
    },
});

export const reducerAccount = slice.reducer;

export const selectSignInState = ({ account }: any) => {
    const { isSignIn, users, currentUserID, isServerVerifiedUser } = account;
    const credentials = users[currentUserID];
    return {
        isSignIn,
        users,
        currentUserID,
        isServerVerifiedUser,
        credentials,
    };
};
export const { signIn, signOut } = slice.actions;
