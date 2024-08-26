import { customizationApi } from "./api";
import { LoggedUser } from "./authApi";

export const refreshTokenApi = customizationApi.injectEndpoints({
  endpoints: (build) => ({
    refreshToken: build.query<LoggedUser, void>({
      query: () => ({
        url: "/refresh",
        method: "POST",
      }),
    }),
  }),
});

export const { useLazyRefreshTokenQuery } = refreshTokenApi;
