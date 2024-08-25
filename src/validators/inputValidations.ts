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
    const isValid = password.length >= 4;
    const validationMessage = isValid ? '' : 'Password must be at least 4 characters long';
    return [isValid, validationMessage];
  };
