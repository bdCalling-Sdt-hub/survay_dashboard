import baseApis from "../baseApis/baseApis";

export const storyApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllStory: builder.query({
      query: () => ({
        url: "/story/all-story",
        method: "GET",
      }),
      providesTags: ["story"],
    }),
  }),
});

export const { useGetAllStoryQuery } = storyApis;
