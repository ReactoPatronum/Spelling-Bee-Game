import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const gameService = createApi({
  reducerPath: "gameService",
  baseQuery: fetchBaseQuery({}),

  endpoints(builder) {
    return {
      getWords: builder.query({
        query: ({language}) => {
          return {
            url: `/api/words?lang=${language}`,
            method: "GET",
          };
        },
        keepUnusedDataFor: 0,
      }),
    };
  },
});

export const { useGetWordsQuery } = gameService;
