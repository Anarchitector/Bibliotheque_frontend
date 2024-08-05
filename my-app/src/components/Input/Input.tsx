import {InputContainer, InputField, LabelComponent, ErrorMessage} from './styles'
import { InputProps } from './types'

function Input({ name, type = 'text', placeholder, label, value, onChange, error, disabled }: InputProps) {

  return (
    <InputContainer>
      {label && <LabelComponent htmlFor={name}>{label}</LabelComponent>}
      <InputField
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value = {value}
        onChange={onChange}
        disabled={disabled}
      />
      <ErrorMessage>{error}</ErrorMessage>
    </InputContainer>
  )
}

export default Input
