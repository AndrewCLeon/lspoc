import React from "react";
import { useNavigate } from "react-router";
import { CardAction } from "./action/CardAction";
import "./CampaignCard.scss";

type CampaignCardProps = {
  campaignId: string;
  title?: string;
  image?: string;
  actionIcon?: string;
};

export const CampaignCard: React.FC<CampaignCardProps> = (props) => {
  const navigate = useNavigate();
  const title = !props.title ? null : (
    <span className="card-title">{props.title}</span>
  );

  const actionButton = React.useMemo(() => {
    return !props.actionIcon ? null : (
      <a className="btn-floating halfway-fab waves-effect waves-light red">
        <i className="material-icons">{props.actionIcon}</i>
      </a>
    );
  }, [props.actionIcon]);

  const handleCampaignOpen = () => {
    navigate(`/campaign/${props.campaignId}`);
  };

  const handleCampaignDelete = () => {
    navigate(`/campaign/${props.campaignId}/characters/create`);
  };

  const bottomActions = (
    <>
      <CardAction text="Open" onClick={handleCampaignOpen} />
      <CardAction text="Delete" onClick={handleCampaignDelete} />
    </>
  );

  return (
    <div className="card p-0">
      <div className="card-image">
        <a
          href="javascript:void(0)"
          onClick={() => navigate(`/campaign/${props.campaignId}`)}
        >
          <img src={props.image} />
        </a>
        {title}
        {actionButton}
      </div>
      {bottomActions}
    </div>
  );
};
