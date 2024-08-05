import {ButtonCompanent} from './styles'
import { ButtonProps } from './type'

function Button({ name, type = 'button', onClick, disabled = false }: ButtonProps) {
  return (
    <ButtonCompanent type={type} onClick={onClick} disabled={disabled}>
      {name}
    </ButtonCompanent>
  )
}

export default Button
