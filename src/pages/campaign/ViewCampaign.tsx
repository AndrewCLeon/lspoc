import React from "react";
import { useParams } from "react-router";
import { CampaignBanner } from "../../components/campaignBanner/CampaignBanner";
import { CharacterCard } from "../../components/characterCard/CharacterCard";

export const ViewCampaign: React.FC = () => {
  const { campaignId } = useParams<{ campaignId: string }>();

  return (
    <>
      <CampaignBanner />
      <div className="row">
        <div className="col s3">
          <CharacterCard campaignId={campaignId} characterId="Elara" />
        </div>
        <div className="col s3">
          <CharacterCard campaignId={campaignId} characterId="Elara" />
        </div>
        <div className="col s3">
          <CharacterCard campaignId={campaignId} characterId="Elara" />
        </div>
        <div className="col s3">
          <CharacterCard campaignId={campaignId} characterId="Elara" />
        </div>
      </div>
    </>
  );
};
