type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
type BaseInputProps = {
  ref?: React.LegacyRef<HTMLInputElement>;
  label: string;
  type: InputType;
  classNames?: string;
  defaultValue?: string;
  onChange?: () => void;
  validate?: () => [boolean?, string?, string?];
};
