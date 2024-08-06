import type React from 'react';
import { useState, useEffect } from 'react';
import type { FieldAttributes } from 'formik';
import { useField } from 'formik';
import styled from '@emotion/styled';

interface InputPhoneProps extends FieldAttributes<any> {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

const InputContainer = styled.div`
  // your styles here
`;

const LabelComponent = styled.label`
  // your styles here
`;

const InputField = styled.input`
  // your styles here
`;

const ErrorMessage = styled.div`
  // your styles here
`;

const InputPhone2: React.FC<InputPhoneProps> = ({ label, placeholder, disabled, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const [internalValue, setInternalValue] = useState<string>(field.value || '');

  const formatPhoneNumber = (phoneNumber: string) => {
    const numericPhoneNumber = phoneNumber.replace(/\D/g, '');
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
    return formattedPhoneNumber;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(event.target.value);
    setInternalValue(formattedValue);
    helpers.setValue(formattedValue); // Update Formik's state
  };

  useEffect(() => {
    setInternalValue(field.value || '');
  }, [field.value]);

  return (
    <InputContainer>
      {label && <LabelComponent htmlFor={field.name}>{label}</LabelComponent>}
      <InputField
        id={field.name}
        name={field.name}
        type="text"
        placeholder={placeholder}
        value={internalValue}
        onChange={handleChange}
        disabled={disabled}
      />
      {meta.touched && meta.error ? <ErrorMessage>{meta.error}</ErrorMessage> : null}
    </InputContainer>
  );
};


export default InputPhone2;