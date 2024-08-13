import { PayloadAction } from "@reduxjs/toolkit";
import { CharacterState } from "../../../types/store/CharacterState";

const loadCharacters = (
  state: CharacterState,
  action: PayloadAction<Character[]>
) => {
  const characters = action.payload;
  characters.forEach((character) => {
    const { name, campaign, assistantId } = character;

    if (state.byName[name]) return;

    // Add to byId
    state.byName[name] = character;

    // Add to byCampaign
    if (!state.byCampaign[campaign]) {
      state.byCampaign[campaign] = [];
      state.allCampaigns.push(campaign);
    }
    state.byCampaign[campaign].push(name);

    // Add to byAssistantId
    state.byAssistantId[assistantId] = name;
  });
};

const addCharacter = (
  state: CharacterState,
  action: PayloadAction<Character>
) => {
  const character = action.payload;
  const { name, campaign, assistantId } = character;

  // Add to byId
  state.byName[name] = character;

  // Add to byCampaign
  if (!state.byCampaign[campaign]) {
    state.byCampaign[campaign] = [];
    state.allCampaigns.push(campaign);
  }
  state.byCampaign[campaign].push(name);

  // Add to byAssistantId
  state.byAssistantId[assistantId] = name;
};
const removeCharacterByName = (
  state: CharacterState,
  action: PayloadAction<string>
) => {
  const characterName = action.payload;
  const character = state.byName[characterName];
  if (!character) return;

  const { campaign, assistantId } = character;

  // Remove from byId
  delete state.byName[characterName];

  // Remove from byCampaign
  const campaignIndex = state.byCampaign[campaign]?.indexOf(characterName);
  if (campaignIndex !== undefined && campaignIndex > -1) {
    state.byCampaign[campaign].splice(campaignIndex, 1);
    if (state.byCampaign[campaign].length === 0) {
      delete state.byCampaign[campaign];
      const allCampaignsIndex = state.allCampaigns.indexOf(campaign);
      if (allCampaignsIndex > -1) {
        state.allCampaigns.splice(allCampaignsIndex, 1);
      }
    }
  }

  // Remove from byAssistantId
  delete state.byAssistantId[assistantId];
};

export { loadCharacters, addCharacter, removeCharacterByName };
