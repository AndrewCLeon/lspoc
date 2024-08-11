import React from "react";
import { useParams } from "react-router-dom";

export const CreateCharacter: React.FC = () => {
  const { campaignId } = useParams<{ campaignId: string }>();

  return (
    <div>
      <h1>Create Character</h1>
      <p>Route Param: {campaignId}</p>
    </div>
  );
};
