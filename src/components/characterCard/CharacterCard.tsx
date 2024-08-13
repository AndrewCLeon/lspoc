import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { characterSelectors } from "../../store/slices/characters/characters";

type CharacterCardProps = {
  campaignId: string | undefined;
  assistantId: string;
};

export const CharacterCard: React.FC<CharacterCardProps> = (props) => {
  const navigate = useNavigate();

  const character: Character | undefined = useSelector(
    characterSelectors.getCharacterByAssistantId
  )(props.assistantId);

  return (
    <div className="card">
      <div className="card-content">
        <span className="card-title">{character?.name}</span>
        <p>Rogue</p>
        <p></p>
      </div>
      <div className="card-action">
        <a
          href="javascript:void(0)"
          onClick={() =>
            navigate(`/campaign/${props.campaignId}/${props.assistantId}/chat`)
          }
        >
          Chat
        </a>
        <a
          href="javascript:void(0)"
          onClick={() =>
            navigate(
              `/campaign/${props.campaignId}/${props.assistantId}/files/upload`
            )
          }
        >
          Add Files
        </a>
      </div>
    </div>
  );
};
