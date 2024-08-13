import {ButtonCompanent} from './styles'
import type { ButtonProps } from './type'


function Button({ name, type="button", onClick, disabled = false, color }: ButtonProps) {
  return (
    <ButtonCompanent type={type} onClick={onClick} disabled={disabled} customColor={color}  >
      {name}
    </ButtonCompanent>
  )
}

export default Button
