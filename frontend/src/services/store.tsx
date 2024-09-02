import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { customizationApi } from "./api";
import authenticationSlice from "./authenticationSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import orderSlice from "./orderSlice";
import materialSlice from "./materialSlice";
import userSlice from "./userSlice";
import { Provider } from "react-redux";
import { ReactNode } from "react";
import { render } from "@testing-library/react";
import userAccountSlice from "./userAccountSlice";

export const store = configureStore({
  reducer: {
    auth: authenticationSlice.reducer,
    products: productSlice.reducer,
    materials: materialSlice.reducer,
    cart: cartSlice.reducer,
    order: orderSlice.reducer,
    user: userSlice.reducer,
    userAccount: userAccountSlice.reducer,
    [customizationApi.reducerPath]: customizationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customizationApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const renderWithProviders = (component: ReactNode) => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
  };

  return render(component, { wrapper: Wrapper });
};
