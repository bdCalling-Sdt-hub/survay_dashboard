import baseApis from "../baseApis/baseApis";

export const metaApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getOverViews: builder.query({
      query: (year) => ({
        url: "/meta/user-chart-data",
        method: "GET",
        params: year,
      }),
      providesTags: ["overView"],
    }),
    getAllMetaData: builder.query({
      query: () => ({
        url: "/meta/dashboard-meta-data",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetOverViewsQuery, useGetAllMetaDataQuery } = metaApis;
