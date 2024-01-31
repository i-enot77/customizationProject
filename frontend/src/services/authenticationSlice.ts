import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: string | null;
  accessToken: string | null;
}

interface AppState {
  auth: AuthState;
  persist: boolean;
  errMsg: string | null;
}

// const getPersistFromLocalStorage = (): boolean => {
//   const persistValue = localStorage.getItem("persist");
//   return persistValue ? JSON.parse(persistValue) : false;
// };

const getPersistFromLocalStorage = (): boolean => {
  const persistValue = localStorage.getItem("persist");

  // Check if the value is a string and not "undefined"
  return typeof persistValue === "string" && persistValue !== "undefined"
    ? JSON.parse(persistValue)
    : false;
};

const initialState: AppState = {
  auth: { user: null, accessToken: null },
  persist: getPersistFromLocalStorage(),
  errMsg: null,
};

const authenticationSlice = createSlice({
  name: "authauthentication",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<AuthState>) {
      state.auth = { ...state.auth, ...action.payload };
    },
    setPersist(state, action: PayloadAction<boolean>) {
      state.persist = action.payload;
    },
    setErrMsg(state, action: PayloadAction<string | null>) {
      state.errMsg = action.payload;
    },
  },
});

export const { setAuth, setPersist, setErrMsg } = authenticationSlice.actions;
export default authenticationSlice;
