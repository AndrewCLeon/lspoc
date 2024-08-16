import React from "react";
import { useParams } from "react-router";
import "./CampaignBanner.scss";

export const CampaignBanner: React.FC = () => {
  const divRef = React.createRef<HTMLDivElement>();

  const { campaignId } = useParams<{ campaignId: string }>();

  React.useEffect(() => {
    if (campaignId) {
      divRef.current!.style!.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/lspoc/${campaignId}.webp)`;
    }
  }, [campaignId]);

  return (
    <div ref={divRef} className="campaign-banner">
      <div className="campaign-banner-text">
        <h1>{campaignId}</h1>
      </div>
    </div>
  );
};
