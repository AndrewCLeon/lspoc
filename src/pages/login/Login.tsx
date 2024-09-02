import React from 'react';
import * as Auth from 'aws-amplify/auth';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/slices/auth/auth';
import { useNavigate } from 'react-router';
import { RoutePaths } from '../../enums/RoutePaths';
import { PasswordInput } from '../../components/input/password/PasswordInput';
import { TextInput } from '../../components/input/text/TextInput';
import { validatePassword, validateUsername } from '../../validators/inputValidations';
import './Login.scss';

export const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const usernameRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const [inputValidationStatus, setInputValidationStatus] = React.useState<Record<string, boolean>>(
    {},
  );

  // TODO: Fix isolation and adhere to single responsibility principle
  React.useEffect(() => {
    const checkIfUserIsAuthenticated = async () => {
      const user = await Auth.getCurrentUser();
      if (user) {
        dispatch(authActions.setUserId(user.userId));
        navigate(RoutePaths.Home);
      }
    };
    checkIfUserIsAuthenticated();
  }, []);

  const handleInputValidation = React.useCallback(
    (inputLabel: string, isValid: boolean) => {
      setInputValidationStatus({
        ...inputValidationStatus,
        [inputLabel]: isValid,
      });
    },
    [inputValidationStatus, setInputValidationStatus],
  );

  const signInDisabled = React.useMemo(() => {
    return !inputValidationStatus['Username'] || !inputValidationStatus['Password'];
  }, [inputValidationStatus]);

  // TODO: Fix isolation and adhere to single responsibility principle
  const handleSignIn = React.useCallback(async () => {
    if (signInDisabled) return;

    try {
      const { nextStep, isSignedIn } = await Auth.signIn({
        username: usernameRef.current?.value ?? '',
        password: passwordRef.current?.value,
      });

      if (isSignedIn && nextStep.signInStep === 'DONE') {
        const user = await Auth.getCurrentUser();
        dispatch(authActions.setUserId(user.userId));
        navigate(RoutePaths.Home);
      } else if (nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
        dispatch(authActions.setUsername(usernameRef.current?.value ?? ''));
        navigate(RoutePaths.PasswordReset);
      } else if (nextStep.signInStep === 'RESET_PASSWORD') {
        navigate(RoutePaths.PasswordReset);
      } else {
        navigate(RoutePaths.Home);
      }
    } catch (error) {
      if (error instanceof Auth.AuthError) {
        if (error.name === 'UserNotFoundException') {
          setInputValidationStatus({
            ...inputValidationStatus,
            Username: false,
          });
        }

        if (error.name === 'NotAuthorizedException') {
          setInputValidationStatus({
            ...inputValidationStatus,
            Password: false,
          });
        }
      }
    }
  }, [signInDisabled, navigate]);

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
          onValidation={handleInputValidation}
        />
      </div>
      <div className="row">
        <PasswordInput
          ref={passwordRef}
          label="Password"
          classNames="col s4 offset-s4"
          validate={passwordValidation}
          onValidation={handleInputValidation}
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
