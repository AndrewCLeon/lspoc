import { createSlice } from "@reduxjs/toolkit";
import { CharacterState } from "../../../types/store/CharacterState";
import * as allCharacterSelectors from "./selectors";
import * as allCharacterReducers from "./reducers";

const initialState: CharacterState = {
  byName: {},
  byCampaign: {},
  byAssistantId: {},
  allCampaigns: [],
};

const characterSlice = createSlice({
  name: "characters",
  initialState,
  reducers: allCharacterReducers,
  selectors: allCharacterSelectors,
});

export const characterReducer = characterSlice.reducer;
export const characterActions = characterSlice.actions;
export const characterSelectors = characterSlice.selectors;
export default characterSlice;
