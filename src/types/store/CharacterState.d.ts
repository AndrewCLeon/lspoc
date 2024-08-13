export interface CharacterState {
  byName: Record<string, Character>;
  byCampaign: Record<string, string[]>; // campaign -> array of character IDs
  byAssistantId: Record<string, string>; // assistantId -> character ID
  allCampaigns: string[]; // list of all unique campaigns
}
