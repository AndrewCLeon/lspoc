import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth/auth";
import { characterReducer } from "./slices/characters/characters";

const rootReducer = combineReducers({
  auth: authReducer,
  characters: characterReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppState = ReturnType<typeof store.getState>;

export default store;
