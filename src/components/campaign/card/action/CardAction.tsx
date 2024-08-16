type CardActionProps = {
  text: string;
  onClick: () => void;
};

export const CardAction: React.FC<CardActionProps> = (props) => {
  return (
    <div className="card-action center-align p-1">
      <a className="" href="javascript:void(0)" onClick={props.onClick}>
        {props.text}
      </a>
    </div>
  );
};
