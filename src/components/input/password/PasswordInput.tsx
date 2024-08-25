import React from 'react';
import { BaseInput } from '../base/BaseInput';

export const PasswordInput: React.FC<PasswordInputProps> = React.forwardRef((props, ref) => {
  return <BaseInput {...props} ref={ref} type="password" />;
});
