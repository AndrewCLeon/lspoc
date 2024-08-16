import React from "react";
import { useNavigate } from "react-router";
import "./Login.scss";

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const usernameRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const [signInDisabled, setSignInDisabled] = React.useState(true);

  const handleUsernameChange = () => {
    // console.log(usernameRef.current?.value);
    // Validate username, length greater than 4
    updateSignInDisabled();
  };

  const handleUsernameUnfocus = () => {
    console.log(usernameRef.current?.value);
    // Validate username, length greater than 4
  };

  const handlePasswordChange = () => {
    console.log(passwordRef.current?.value);
    updateSignInDisabled();
  };

  const updateSignInDisabled = React.useCallback(() => {
    // Check if username and password are valid
    const usernameLength = usernameRef.current?.value.length ?? 0;
    const passwordLength = passwordRef.current?.value.length ?? 0;
    const valid = usernameLength >= 4 && passwordLength >= 4;
    setSignInDisabled(!valid);
  }, [setSignInDisabled]);

  const handleSignIn = () => {
    if (signInDisabled) return;

    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s8 offset-s2">
          <h1 className="center-align">Lore Vault</h1>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s6 offset-s3">
          <input
            id="username"
            type="text"
            ref={usernameRef}
            className="validate"
            onChange={handleUsernameChange}
            onBlur={handleUsernameUnfocus}
          />
          <label htmlFor="username">Username</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s6 offset-s3">
          <input
            id="password"
            type="password"
            ref={passwordRef}
            className="validate"
            onChange={handlePasswordChange}
          />
          <label htmlFor="password">Password</label>
        </div>
      </div>
      <div className="row">
        <div className="center-align col s8 offset-s2">
          <button
            name="action"
            type="submit"
            className="btn waves-effect waves-light"
            disabled={signInDisabled}
            onClick={handleSignIn}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};
