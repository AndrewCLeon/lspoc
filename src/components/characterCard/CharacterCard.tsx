import React from "react";

type CharacterCardProps = {
  campaignId: string | undefined;
  characterId: string;
};

export const CharacterCard: React.FC<CharacterCardProps> = (props) => {
  return (
    <div className="card">
      <div className="card-content">
        <span className="card-title">Elara</span>
        <p>Rogue</p>
        <p></p>
      </div>
      <div className="card-action">
        <a
          href={`/lspoc/campaign/${props.campaignId}/${props.characterId}/chat`}
        >
          Chat
        </a>
        <a
          href={`/lspoc/campaign/${props.campaignId}/${props.characterId}/files/upload`}
        >
          Add Files
        </a>
      </div>
    </div>
  );
};
