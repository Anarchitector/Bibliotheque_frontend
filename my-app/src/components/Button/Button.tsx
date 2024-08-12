import { ButtonComponent } from './styles'
import type { ButtonProps } from './type'

function Button({ name, type="button", onClick, disabled = false }: ButtonProps) {
  return (
    <ButtonComponent type={type} onClick={onClick} disabled={disabled} buttonType={name}>
      {name}
    </ButtonComponent>
  )
}

export default Button
