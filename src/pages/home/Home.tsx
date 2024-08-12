import React from "react";
import { CampaignCard } from "../../components/campaignCard/CampaignCard";

export const Home: React.FC = () => {
  return (
    <div className="row">
      <div className="col s12 m12 l4">
        <CampaignCard
          campaignId="TOA"
          image="/lspoc/TOA.webp"
          description="The Tomb of Annihilation is a deadly temple hidden deep within a dark, overgrown jungle, where ancient traps and curses await those who dare to enter."
        />
      </div>
      <div className="col s12 m12 l4">
        <CampaignCard
          campaignId="MadMage"
          image="/lspoc/MadMage.webp"
          description="Waterdeep: Dungeon of the Mad Mage is an ancient, labyrinthine dungeon beneath Waterdeep, filled with deadly traps, twisted monsters, and the lingering madness of its creator, Halaster Blackcloak."
        />
      </div>
      <div className="col s12 m12 l4">
        <CampaignCard
          campaignId="StormKing"
          image="/lspoc/StormKing.webp"
          description="Storm King’s Thunder is an epic adventure where towering giants roam the land under a raging storm, threatening to plunge the world into chaos and destruction."
        />
      </div>
    </div>
  );
};
