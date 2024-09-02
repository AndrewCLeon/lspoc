import React from 'react';

export const validateUsername =
  (ref: React.RefObject<HTMLInputElement>) => (): ValidationResult => {
    const username = ref.current?.value ?? '';
    const isValid = username.length >= 4;
    const validationMessage = isValid ? '' : 'Username must be at least 4 characters long';
    return [isValid, validationMessage];
  };

export const validatePassword =
  (ref: React.RefObject<HTMLInputElement>) => (): ValidationResult => {
    const password = ref.current?.value ?? '';
    const minLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]|(?<!^)\s(?!$)/.test(password);

    let validationMessage = '';
    if (!minLength) {
      validationMessage = 'Password must be at least 8 characters long';
    } else if (!hasNumber) {
      validationMessage = 'Password must contain at least 1 number';
    } else if (!hasLowercase) {
      validationMessage = 'Password must contain at least 1 lowercase letter';
    } else if (!hasUppercase) {
      validationMessage = 'Password must contain at least 1 uppercase letter';
    } else if (!hasSpecialChar) {
      validationMessage =
        'Password must contain at least 1 special character or a non-leading, non-trailing space';
    }

    const isValid = minLength && hasNumber && hasLowercase && hasUppercase && hasSpecialChar;
    return [isValid, validationMessage];
  };
