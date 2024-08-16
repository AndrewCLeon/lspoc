import React from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { authActions, authSelectors } from "../../store/slices/auth/auth";
import "./Navbar.scss";

interface NavbarProps {
  children: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = (props) => {
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

  return (
    <>
      <div className="navbar-fixed pb-8">
        <nav>
          <div className="nav-wrapper">
            <span className="brand-logo pl-2" onClick={navigateToHome}>
              Lore Vault
            </span>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>{setKeyContent}</li>
              <li>
                <a className="dropdown-trigger" data-target="dropdown1">
                  <i className="material-icons right">menu</i>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      {props.children}
    </>
  );
};
