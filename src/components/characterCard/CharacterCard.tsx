import React from "react";
import { useNavigate } from "react-router";

type CharacterCardProps = {
  campaignId: string | undefined;
  characterId: string;
};

export const CharacterCard: React.FC<CharacterCardProps> = (props) => {
  const navigate = useNavigate();
  return (
    <div className="card">
      <div className="card-content">
        <span className="card-title">Elara</span>
        <p>Rogue</p>
        <p></p>
      </div>
      <div className="card-action">
        <a
          href="javascript:void(0)"
          onClick={() =>
            navigate(`/campaign/${props.campaignId}/${props.characterId}/chat`)
          }
        >
          Chat
        </a>
        <a
          href="javascript:void(0)"
          onClick={() =>
            navigate(
              `/campaign/${props.campaignId}/${props.characterId}/files/upload`
            )
          }
        >
          Add Files
        </a>
      </div>
    </div>
  );
};
