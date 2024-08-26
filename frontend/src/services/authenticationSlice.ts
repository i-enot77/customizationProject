import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPersistFromLocalStorage } from "@/features/auth/utils/persistFromLocalStorage";

interface Auth {
  userData: {
    _id: string;
    email: string;
  } | null;
  isAuthenticated: boolean;
}

interface AuthState {
  auth: Auth;
  persist: boolean;
}

const initialState: AuthState = {
  auth: {
    userData: null,
    isAuthenticated: false,
  },
  persist: getPersistFromLocalStorage(),
};

const authenticationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<Auth>) {
      state.auth = action.payload;
    },
    setPersist(state, action: PayloadAction<boolean>) {
      const expiration = action.payload
        ? Date.now() + 24 * 60 * 60 * 1000
        : null;
      const persistData = {
        value: action.payload,
        expiration: expiration,
      };
      state.persist = action.payload;
      localStorage.setItem("persist", JSON.stringify(persistData));
    },

    clearUserData(state) {
      state.auth = { userData: null, isAuthenticated: false };
      localStorage.removeItem("persist"); // Clear persist flag on logout
    },
  },
});

export const { setAuth, setPersist, clearUserData } =
  authenticationSlice.actions;
export default authenticationSlice;
