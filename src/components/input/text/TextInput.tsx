import React from 'react';
import { BaseInput } from '../base/BaseInput';

export const TextInput: React.FC<TextInputProps> = React.forwardRef((props, ref) => {
  return <BaseInput {...props} ref={ref} type="text" />;
});
