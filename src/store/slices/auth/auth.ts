import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  apiKey: string;
}

const initialState: AuthState = {
  apiKey: "",
};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    setKey: (state: AuthState, action: PayloadAction<string>) => {
      state.apiKey = action.payload;
    },
  },
  selectors: {
    getKey: (state) => state.apiKey,
    isKeySet: (state) => !!state.apiKey,
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
export const authSelectors = authSlice.selectors;
export default authSlice;
