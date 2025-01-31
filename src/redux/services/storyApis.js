import baseApis from "../baseApis/baseApis";

export const storyApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllStory: builder.query({
      query: ({ searchTerm, status }) => {
        const params = { searchTerm, status };
        console.log(searchTerm);
        return {
          url: "/story/all-story",
          method: "GET",
          params,
        };
      },
      providesTags: ["Story"],
    }),
    approveStory: builder.mutation({
      query: ({ id }) => ({
        url: `/story/approve-story/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Story"],
    }),
    deleteStory: builder.mutation({
      query: ({ id }) => ({
        url: `/story/delete-story/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Story"],
    }),
  }),
});

export const {
  useGetAllStoryQuery,
  useApproveStoryMutation,
  useDeleteStoryMutation,
} = storyApis;
