import React, { useId } from 'react';

export const BaseInput: React.FC<BaseInputProps> = React.forwardRef((props, ref) => {
  const inputId = useId();

  // Prevent line wrap
  // prettier-ignore
  const [validationStatus, setValidationStatus] = React.useState<[string?, string?, string?]>([undefined, undefined]);

  const { 0: validationClass, 1: inputError, 2: inputSuccess } = validationStatus;

  const wrapperClasses = React.useMemo(() => {
    const inputFieldClass = 'input-field';
    const additionalClasses = props.classNames ?? 'col s6 offset-s3';
    return `${inputFieldClass} ${additionalClasses}`;
  }, [props.classNames]);

  const validateInput = React.useCallback(() => {
    if (!props.validate) return;

    const [valid, errorMessage, successMessage] = props.validate();

    // If the validation function returns undefined, reset the validation status
    if (valid === undefined) setValidationStatus([undefined, undefined]);
    else {
      // Set the validation status based on the result of the validation function
      const validationClass = valid ? 'valid' : 'invalid';
      setValidationStatus([validationClass, errorMessage, successMessage]);
    }
  }, [props.validate]);

  const handleInputBlur = React.useCallback(() => {
    props.onChange?.();
    validateInput();
  }, [props.onChange, validateInput]);

  return (
    <div className={wrapperClasses}>
      <label htmlFor={inputId}>{props.label}</label>
      <input
        ref={ref}
        id={inputId}
        type={props.type}
        className={validationClass}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        onBlur={handleInputBlur}
      />
      <span className="helper-text" data-error={inputError} data-success={inputSuccess}></span>
    </div>
  );
});
