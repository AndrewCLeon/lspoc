import React from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { CampaignBanner } from "../../components/campaign/banner/CampaignBanner";
import { CharacterCard } from "../../components/characterCard/CharacterCard";
import { characterSelectors } from "../../store/slices/characters/characters";

export const ViewCampaign: React.FC = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  const characters = useSelector(characterSelectors.getCharactersByCampaign)(
    campaignId ?? ""
  ) as Character[];

  const campaignCharacterCards = React.useMemo(() => {
    return Object.values(characters).map((character) => {
      return (
        <div key={character.assistantId} className="col s3">
          <CharacterCard
            campaignId={campaignId}
            assistantId={character.assistantId}
          />
        </div>
      );
    });
  }, [characters, campaignId]);

  return (
    <>
      <CampaignBanner />
      <div className="row">{campaignCharacterCards}</div>
    </>
  );
};
