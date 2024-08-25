import React from 'react';
import { useNavigate } from 'react-router';
import { PasswordInput } from '../../components/input/password/PasswordInput';
import { TextInput } from '../../components/input/text/TextInput';
import { validatePassword, validateUsername } from '../../validators/inputValidations';
import './Login.scss';

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const usernameRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const [signInDisabled, setSignInDisabled] = React.useState(true);

  const handleUsernameChange = React.useCallback(() => {
    // console.log(usernameRef.current?.value);
    // Validate username, length greater than 4
    updateSignInDisabled();
  }, []);

  const handlePasswordChange = React.useCallback(() => {
    console.log(passwordRef.current?.value);
    updateSignInDisabled();
  }, []);

  const updateSignInDisabled = React.useCallback(() => {
    // Check if username and password are valid
    const usernameLength = usernameRef.current?.value.length ?? 0;
    const passwordLength = passwordRef.current?.value.length ?? 0;
    const valid = usernameLength >= 4 && passwordLength >= 4;
    setSignInDisabled(!valid);
  }, [setSignInDisabled]);

  const handleSignIn = () => {
    if (signInDisabled) return;

    navigate('/');
  };

  const usernameValidation = React.useMemo(() => validateUsername(usernameRef), []);
  const passwordValidation = React.useMemo(() => validatePassword(passwordRef), []);

  return (
    <div className="container">
      <div className="row">
        <div className="col s4 offset-s4">
          <h1 className="center-align">Lore Vault</h1>
        </div>
      </div>
      <div className="row">
        <TextInput
          ref={usernameRef}
          label="Username"
          classNames="col s4 offset-s4"
          validate={usernameValidation}
          onChange={handleUsernameChange}
        />
      </div>
      <div className="row">
        <PasswordInput
          ref={passwordRef}
          label="Password"
          classNames="col s4 offset-s4"
          validate={passwordValidation}
          onChange={handlePasswordChange}
        />
      </div>
      <div className="row">
        <div className="center-align col s4 offset-s4">
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
