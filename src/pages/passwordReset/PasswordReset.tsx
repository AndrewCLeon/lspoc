import React from 'react';
import { useNavigate } from 'react-router';
import { RoutePaths } from '../../enums/RoutePaths';
import { PasswordInput } from '../../components/input/password/PasswordInput';
import { validatePassword } from '../../validators/inputValidations';
import { useSelector } from 'react-redux';
import { authSelectors } from '../../store/slices/auth/auth';

export const PasswordReset: React.FC = () => {
  const navigate = useNavigate();

  const username = useSelector(authSelectors.getUsername);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const confirmPasswordRef = React.useRef<HTMLInputElement>(null);

  const [inputValidationStatus, setInputValidationStatus] = React.useState<Record<string, boolean>>(
    {},
  );

  // TODO: Implement password reset logic (when I can actually get the confirmation code sent and working)
  const resetUserPassword = React.useCallback(async () => {}, [username]);

  // TODO: Fix isolation and adhere to single responsibility principle
  React.useEffect(() => {
    if (!username) navigate(RoutePaths.Login);
    else {
      resetUserPassword();
    }
  }, [username]);

  const handleInputValidation = React.useCallback(
    (inputLabel: string, isValid: boolean) => {
      setInputValidationStatus({
        ...inputValidationStatus,
        [inputLabel]: isValid,
      });
    },
    [inputValidationStatus, setInputValidationStatus],
  );

  const resetPasswordDisabled = React.useMemo(() => {
    return !inputValidationStatus['Password'] || !inputValidationStatus['Confirm Password'];
  }, [inputValidationStatus]);

  const handlePasswordReset = React.useCallback(() => {
    if (resetPasswordDisabled) return;
    navigate(RoutePaths.Home);
  }, [resetPasswordDisabled]);

  const passwordValidation = React.useMemo(() => validatePassword(passwordRef), []);
  const confirmPasswordValidation = React.useCallback((): [boolean, string?, string?] => {
    const passwordsMatch = passwordRef.current?.value === confirmPasswordRef.current?.value;
    let validationMessage: string | undefined = undefined;
    if (!passwordsMatch) {
      validationMessage = 'Passwords do not match';
    }

    return [passwordsMatch, validationMessage];
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col s4 offset-s4">
          <h3 className="center-align">Reset Password</h3>
        </div>
      </div>
      <form onSubmit={handlePasswordReset}>
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
          <PasswordInput
            ref={confirmPasswordRef}
            label="Confirm Password"
            classNames="col s4 offset-s4"
            validate={confirmPasswordValidation}
            onValidation={handleInputValidation}
          />
        </div>
        <div className="row">
          <div className="center-align col s4 offset-s4">
            <button
              name="action"
              type="submit"
              className="btn waves-effect waves-light"
              disabled={resetPasswordDisabled}
            >
              Reset Password
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
