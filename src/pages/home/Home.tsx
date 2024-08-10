import React from "react";
import { CampaignCard } from "../../components/campaignCard/CampaignCard";

export const Home: React.FC = () => {
  return (
    <div className="row">
      <div className="col s4">
        <CampaignCard
          description="The Tomb of Annihilation is a deadly temple hidden deep within a dark, overgrown jungle, where ancient traps and curses await those who dare to enter."
          image="/lspoc/TOA.webp"
        />
      </div>
      <div className="col s4">
        <div className="card"></div>
      </div>
      <div className="col s4">
        <div className="card"></div>
      </div>
    </div>
  );
};
