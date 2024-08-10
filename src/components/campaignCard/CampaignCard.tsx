import React from "react";
import "./CampaignCard.scss";

type CampaignCardProps = {
  title?: string;
  description?: string;
  image?: string;
};

export const CampaignCard: React.FC<CampaignCardProps> = (props) => {
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
      <a href="#">View Campaign</a>
    </div>
  );

  return (
    <div className="card p-0">
      <div className="card-image">
        <img src={props.image} />
        {title}
        {actionButton}
      </div>
      <div className="card-content">
        <p>{props.description}</p>
      </div>
      {bottomActions}
    </div>
  );
};
