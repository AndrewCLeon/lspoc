import React from 'react';
import { CampaignCard } from '../../components/campaign/card/CampaignCard';
import { Navbar } from '../../components/navbar/Navbar';
import { ModalContainer } from '../../components/modal/ModalContainer';

export const Home: React.FC = () => {
  return (
    <Navbar>
      <div className="row pt-8">
        <div className="col s12 m12 l2">
          <CampaignCard campaignId="TOA" image="/lspoc/TOA.webp" />
        </div>
        <div className="col s12 m12 l2">
          <CampaignCard campaignId="MadMage" image="/lspoc/MadMage.webp" />
        </div>
        <div className="col s12 m12 l2">
          <CampaignCard campaignId="StormKing" image="/lspoc/StormKing.webp" />
        </div>
      </div>
    </Navbar>
  );
};
