import { InputContainer, InputField, LabelComponent, ErrorMessage } from './styles'
import type { InputPhoneProps } from './types'
import type React from 'react';
import { useState } from 'react';

function InputPhone({ name,  placeholder,  label,  value = '',  onChange,  error,  disabled,}: InputPhoneProps) {
  
  const [internalValue, setInternalValue] = useState<string>(value);

  function formatPhoneNumber (phoneNumber: string) {
    // Reject non-numeric characters
    // \D - any character that's NOT a digit, g - "global", i.e. valid for entre string, "" - replacement with nothing
    const numericPhoneNumber = phoneNumber.replace(/\D/g, '');

    // Format the phone number
    let formattedPhoneNumber = '+';
    if (numericPhoneNumber.length > 0) {
      formattedPhoneNumber += numericPhoneNumber.substring(0, 2);
    }
    if (numericPhoneNumber.length > 2) {
      formattedPhoneNumber += ' (' + numericPhoneNumber.substring(2, 5) + ')';
    }
    if (numericPhoneNumber.length > 5) {
      formattedPhoneNumber += ' ' + numericPhoneNumber.substring(5, 8);
    }
    if (numericPhoneNumber.length > 8) {
      formattedPhoneNumber += ' ' + numericPhoneNumber.substring(8, 10);
    }
    if (numericPhoneNumber.length > 10) {
      formattedPhoneNumber += ' ' + numericPhoneNumber.substring(10, 12);
    }
    console.log("formattedPhoneNumber "+formattedPhoneNumber)
    return formattedPhoneNumber;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(event.target.value);
    setInternalValue(formattedValue);
    if (onChange) {
      // Create a synthetic event to match the expected type
      const syntheticEvent = {
        ...event,
        target: {
          ...event.target,
        },
      };
      onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <InputContainer>
      {label && <LabelComponent htmlFor={name}>{label}</LabelComponent>}
      <InputField
        id={name}
        name={name}
        type="text"
        placeholder={placeholder}
        value={internalValue}
        onChange={handleChange}
        disabled={disabled}
      />
      <ErrorMessage>{error}</ErrorMessage>
    </InputContainer>
  );
}

export default InputPhone;