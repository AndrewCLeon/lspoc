import React from "react";
// import "./FabCollection.css";

const FabCollection: React.FC = () => {
  React.useEffect(() => {
    M.AutoInit();
  }, []);

  const chatBubbles = ["a", "b", "c"].map((personaName) => {
    return (
      <li key={personaName}>
        <a className="btn-floating red">
          <img
            src={"https://www.w3schools.com/howto/img_avatar.png"}
            alt={personaName}
            className="responsive-img circle fab-image"
          />
          <i></i>
        </a>
      </li>
    );
  });

  return (
    <div className="fixed-action-btn">
      <a className="btn-floating btn-large red">
        <i className="large material-icons">chat</i>
      </a>
      <ul>{chatBubbles}</ul>
    </div>
  );
};

export { FabCollection };
