import baseApis from "../baseApis/baseApis";

export const userApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    superAdminProfileGet: builder.query({
      query: () => ({
        url: "/user/get-my-profile",
        method: "GET",
      }),
      providesTags: ["profile"],
    }),
    getNormalUser: builder.query({
      query: ({ searchTerm, page }) => {
        const params = { searchTerm, page };
        return {
          url: `/normal-user/get-all`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["user"],
    }),

    superAdminProfileUpdate: builder.mutation({
      query: (data) => ({
        url: "/super-admin/update-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),
    updateStatus: builder.mutation({
      query: ({ data, id }) => ({
        url: `/user/change-status/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    sendAnnouncement: builder.mutation({
      query: ({ data }) => ({
        url: "/send-annousment",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useSuperAdminProfileUpdateMutation,
  useSuperAdminProfileGetQuery,
  useGetNormalUserQuery,
  useUpdateStatusMutation,
  useSendAnnouncementMutation,
} = userApis;
