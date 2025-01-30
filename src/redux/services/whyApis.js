import baseApis from "../baseApis/baseApis";

export const whyApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllWhy: builder.query({
      query: () => ({
        url: "/why/get-all-why",
        method: "GET",
      }),
      providesTags: ["why"],
    }),
    getMyWhy: builder.query({
      query: () => ({
        url: "/why/get-my-why",
        method: "GET",
      }),
      providesTags: ["personal-why"],
    }),
  }),
});

export const { useGetAllWhyQuery, useGetMyWhyQuery } = whyApis;
