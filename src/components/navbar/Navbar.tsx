import React, { useEffect } from "react";
import "./Navbar.scss";
import { useNavigate } from "react-router";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const [apiKeyAvailable, setApiKeyAvailable] = React.useState<boolean>(false);

  useEffect(() => {
    const key = localStorage.getItem("API_KEY");
    if (key) {
      setApiKeyAvailable(true);
    }
  }, []);

  const handleSetKey = () => {
    const key = prompt("Enter your API key");
    if (!key) return;

    // Set the key in local storage
    localStorage.setItem("API_KEY", key);
    setApiKeyAvailable(true);
  };

  const setKeyContent = React.useMemo(() => {
    if (apiKeyAvailable) return null;
    return (
      <li>
        <span onClick={handleSetKey}>Set Key</span>
      </li>
    );
  }, [apiKeyAvailable]);

  const navigateToFiles = () => navigate("/files/upload");

  return (
    <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo pl-4">
            Lore Squire
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>{setKeyContent}</li>
            <li>
              <a href="badges.html">Campaigns</a>
            </li>
            <li>
              <a href="sass.html">Characters</a>
            </li>
            <li>
              <span onClick={navigateToFiles}>Files</span>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
