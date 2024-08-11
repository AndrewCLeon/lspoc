import React from "react";
import { useNavigate } from "react-router";
import "./CampaignCard.scss";

type CampaignCardProps = {
  campaignId: string;
  title?: string;
  description?: string;
  image?: string;
};

export const CampaignCard: React.FC<CampaignCardProps> = (props) => {
  const navigate = useNavigate();
  const title = !props.title ? null : (
    <span className="card-title">{props.title}</span>
  );

  const actionButton = (
    <a className="btn-floating halfway-fab waves-effect waves-light red">
      <i className="material-icons">add</i>
    </a>
  );

  const bottomActions = (
    <div className="card-action">
      <a
        href="javascript:void(0)"
        onClick={() =>
          navigate(`/campaign/${props.campaignId}/characters/create`)
        }
      >
        Create Character
      </a>
    </div>
  );

  return (
    <div className="card p-0">
      <a
        href="javascript:void(0)"
        onClick={() => navigate(`/campaign/${props.campaignId}`)}
      >
        <div className="card-image">
          <img src={props.image} />
          {title}
          {actionButton}
        </div>
        <div className="card-content">
          <p>{props.description}</p>
        </div>
      </a>
      {bottomActions}
    </div>
  );
};
