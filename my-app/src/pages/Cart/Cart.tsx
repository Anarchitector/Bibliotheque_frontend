import { useSelector } from "react-redux"
import { RootState } from "store/store"
import { Navigate, useNavigate } from "react-router-dom"
import CartComponent from "components/CartComponent/CartComponent"
import {
  BoxLogReg,
  BtnBoxAuthorization,
  LinkComponent,
  PageComponent,
} from "./styles"
import Button from "components/Button/Button"
import CartUserInfo from "components/CartUserInfo/CartUserInfo"

function Cart() {
  const items = useSelector((state: RootState) => state.cart.items)
  const user = useSelector((state: RootState) => state.USER)
  const navigate = useNavigate()

  if (items.length === 0) {
    return <Navigate to="/" />
  }

  const handleRegisterClick = () => {
    navigate("/api/auth/register?redirect=/cart")
  }

  const handleLoginClick = () => {
    navigate("/api/auth/login?redirect=/cart")
  }

  return (
    <PageComponent>
      <CartComponent />
      {!user.id && (
        <BoxLogReg>
          <span>
            To proceed with your order, you need to register or log in.
          </span>
          <BtnBoxAuthorization>
            <Button name="Register" onClick={handleRegisterClick} />
            <Button name="Log in" onClick={handleLoginClick} />
          </BtnBoxAuthorization>
        </BoxLogReg>
      )}
      {user.id && <CartUserInfo />}
      <LinkComponent to="/">Return to book search</LinkComponent>
    </PageComponent>
  )
}

export default Cart
