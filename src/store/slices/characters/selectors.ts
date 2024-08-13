import { createSelector } from "@reduxjs/toolkit";
import { CharacterState } from "../../../types/store/CharacterState";

const getCharacterByName = createSelector(
  (state) => state.byName,
  (byName) => (name: string) => byName[name]
);

const getCharactersByCampaign = createSelector(
  (state) => state.byCampaign,
  (state) => state.byName,
  (byCampaign, byName) => (campaign: string) =>
    byCampaign[campaign]?.map((name: string) => byName[name]) ?? []
);

const getCharacterByAssistantId = createSelector(
  (state) => state.byAssistantId,
  (state) => state.byName,
  (byAssistantId, byName) => (assistantId: string) =>
    byName[byAssistantId[assistantId]]
);

const getAllCampaigns = createSelector(
  (state) => state,
  (state: CharacterState) => state.allCampaigns
);

const getAllCharacters = createSelector(
  (state) => state,
  (state: CharacterState) => Object.values(state.byName)
);

export {
  getCharacterByName,
  getCharactersByCampaign,
  getCharacterByAssistantId,
  getAllCampaigns,
  getAllCharacters,
};
