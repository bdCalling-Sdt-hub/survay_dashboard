import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "../../utils/server";

const baseApis = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "profile",
    "user",
    "overView",
    "blog",
    "story",
    "why",
    "personal-why",
  ],
  endpoints: () => ({}),
});

export default baseApis;
