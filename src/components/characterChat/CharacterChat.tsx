import { useParams } from "react-router-dom";
import { CampaignBanner } from "../campaignBanner/CampaignBanner";

export const CharacterChat: React.FC = () => {
  const { characterId } = useParams<{ characterId: string }>();

  return (
    <>
      <CampaignBanner />
      <div className="container">
        <h1>{characterId} Chat</h1>
        <textarea></textarea>
      </div>
    </>
  );
};
