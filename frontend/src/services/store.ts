import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { customizationApi } from "./api";
import authenticationSlice from "./authenticationSlice";
import productSlice from "./productSlice";

export const store = configureStore({
  reducer: {
    auth: authenticationSlice.reducer,
    products: productSlice.reducer,
    [customizationApi.reducerPath]: customizationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customizationApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
