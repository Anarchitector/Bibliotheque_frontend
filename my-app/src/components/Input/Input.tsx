import { InputContainer, InputField, LabelComponent, ErrorMessage } from './styles'
import type { InputProps } from './types'

function Input({ name, type = 'text', placeholder, label, value, onChange, error, disabled, maxLength, min, max, onKeyDown }: InputProps) {


  return (
    <InputContainer>
      {label && <LabelComponent htmlFor={name}>{label}</LabelComponent>}      
        <InputField
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          maxLength={maxLength}
          min={min}
          max={max}
        />  
      <ErrorMessage>{error}</ErrorMessage>
    </InputContainer>
  )
}

export default Input
