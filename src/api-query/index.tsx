/**
 * @description For queries with cache
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiQuery = createApi({
    baseQuery: fetchBaseQuery({baseUrl: '/api'}),
    reducerPath: "apiQuery",
    endpoints: (builder) => ({
        getNote: builder.query<any, string | undefined>({
            query: (id) => `/notes/${id}`,
        }),
        getPage: builder.query<any, string>({
            query: (slug) => `/page/${slug}`,
        }),

    }),
});

export const {
    useGetNoteQuery,
    useGetPageQuery
} = apiQuery;
