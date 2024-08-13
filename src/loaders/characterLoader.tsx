import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  characterActions,
  characterSelectors,
} from "../store/slices/characters/characters";

export const CharacterLoader: React.FC = () => {
  const dispatch = useDispatch();
  const allCharacters = useSelector(characterSelectors.getAllCharacters);

  React.useEffect(() => {
    const campaignCharacters = JSON.parse(
      localStorage.getItem("characters") ?? "{}"
    );
    const characters: Character[] = Object.values(campaignCharacters);
    dispatch(characterActions.loadCharacters(characters));
  }, []);

  React.useEffect(() => {
    if (allCharacters.length) {
      console.log("Saving characters to local storage");
      localStorage.setItem("characters", JSON.stringify(allCharacters));
    }
  }, [allCharacters]);

  return null;
};
