import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  userId?: string;
  username?: string;
  apiKey: string;
}

const initialState: AuthState = {
  apiKey: '',
};

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setUserId: (state: AuthState, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setUsername: (state: AuthState, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setKey: (state: AuthState, action: PayloadAction<string>) => {
      state.apiKey = action.payload;
    },
  },
  selectors: {
    getKey: (state) => state.apiKey,
    isKeySet: (state) => !!state.apiKey,
    getUsername: (state) => state.username,
    getUserId: (state) => state.userId,
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
export const authSelectors = authSlice.selectors;
export default authSlice;
