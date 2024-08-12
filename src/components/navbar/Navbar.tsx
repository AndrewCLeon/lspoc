import React from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { authActions, authSelectors } from "../../store/reducers/auth";
import "./Navbar.scss";

export const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isKeySet = useSelector(authSelectors.isKeySet);

  const handleSetKey = () => {
    const key = prompt("Please enter your API Key");
    if (key) {
      localStorage.setItem("API_KEY", key);

      dispatch(authActions.setKey(key));
    }
  };

  const setKeyContent = React.useMemo(() => {
    if (isKeySet) return null;
    return <span onClick={handleSetKey}>Set Key</span>;
  }, [isKeySet]);

  const navigateToHome = () => navigate("/");
  const navigateToFiles = () => navigate("/files/upload");

  return (
    <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper">
          <span className="brand-logo pl-4" onClick={navigateToHome}>
            Lore Squire
          </span>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>{setKeyContent}</li>
            <li>
              <a href="javascript:void(0)" onClick={navigateToHome}>
                Campaigns
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" onClick={navigateToHome}>
                Characters
              </a>
            </li>
            <li>
              <span onClick={navigateToFiles}>Files</span>
            </li>
            <li>
              <a href="javascript:void(0)" onClick={navigateToHome}>
                Gallery
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
