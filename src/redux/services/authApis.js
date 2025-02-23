import baseApis from "../baseApis/baseApis";

export const authApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    postLoginInfo: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    patchNewPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
    forgetEmailPost: builder.mutation({
      query: (data) => {
        // console.log(data);
        return {
          url: "/auth/forget-password",
          method: "POST",
          body: data,
        };
      },
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-reset-otp",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    resendOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/resend-reset-code",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  usePostLoginInfoMutation,
  usePatchNewPasswordMutation,
  useForgetEmailPostMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useResendOtpMutation,
} = authApis;
