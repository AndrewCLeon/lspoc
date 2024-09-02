import React from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RoutePaths } from '../../enums/RoutePaths';
import { authSelectors } from '../../store/slices/auth/auth';
import { Navbar } from '../../components/navbar/Navbar';
import { CampaignCard } from '../../components/campaign/card/CampaignCard';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const userId: string | undefined = useSelector(authSelectors.getUserId);

  // TODO: Fix isolation and adhere to single responsibility principle
  React.useEffect(() => {
    if (!userId) {
      navigate(RoutePaths.Login);
    }
  }, [userId]);

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
