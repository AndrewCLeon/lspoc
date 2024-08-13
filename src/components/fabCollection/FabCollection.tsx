import React from "react";
import { useSelector } from "react-redux";
import { characterSelectors } from "../../store/slices/characters/characters";
// import "./FabCollection.css";

const FabCollection: React.FC = () => {
  const allCharacters = useSelector(characterSelectors.getAllCharacters);

  React.useEffect(() => {
    M.AutoInit();
  }, []);

  const chatBubbles = allCharacters.map((character) => {
    return (
      <li key={character.assistantId}>
        <a className="btn-floating red">
          <img
            src={"https://www.w3schools.com/howto/img_avatar.png"}
            alt={character.name}
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
