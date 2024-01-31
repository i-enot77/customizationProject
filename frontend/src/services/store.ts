import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { customizationApi } from "./api";
import authenticationSlice from "./authenticationSlice";

export const store = configureStore({
  reducer: {
    auth: authenticationSlice.reducer,
    [customizationApi.reducerPath]: customizationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customizationApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query";
// import { customizationApi } from "./api";
// import authenticationSlice from "./authenticationSlice";

// const rootReducer = combineReducers({
//   auth: authenticationSlice.reducer,
//   [customizationApi.reducerPath]: customizationApi.reducer,
// });

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(customizationApi.middleware),
// });

// setupListeners(store.dispatch);

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
