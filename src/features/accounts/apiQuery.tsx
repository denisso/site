import { apiQuery } from "api-query";

export const apiQueryAccounts = apiQuery.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<any, void>({
            query: () => `/users`,
        }),
    }),
});

