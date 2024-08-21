import { useSelector } from "react-redux"
import { RootState } from "store/store"
import { Navigate, useNavigate } from "react-router-dom"
import CartComponent from "components/CartComponent/CartComponent"
import {
  AuthorizComponent,
  BtnBoxAuthorization,
  LinkComponent,
  PageComponent,
} from "./styles"
import Button from "components/Button/Button"
import CartUserInfo from "components/CartUserInfo/CartUserInfo"

function Cart() {
  const items = useSelector((state: RootState) => state.cart.items)
  const user = useSelector((state: RootState) => state.USER) // Получаем состояние пользователя
  const navigate = useNavigate() // Инициализируем navigate

  if (items.length === 0) {
    return <Navigate to="/" />
  }

  // Обработчик перехода на страницу регистрации
  const handleRegisterClick = () => {
    navigate("/api/auth/register")
  }

  // Обработчик перехода на страницу входа
  const handleLoginClick = () => {
    navigate("/api/auth/login")
  }

  return (
    <PageComponent>
      <CartComponent />
      {!user.id && ( // Показываем блок авторизации только если пользователь не авторизован
        <AuthorizComponent>
          <span>
            To proceed with your order, you need to register or log in.
          </span>
          <BtnBoxAuthorization>
            <Button name="Register" onClick={handleRegisterClick} />
            <Button name="Log in" onClick={handleLoginClick} />
          </BtnBoxAuthorization>
        </AuthorizComponent>
      )}
      {user.id && <CartUserInfo />}
      <LinkComponent to="/">Return to book search</LinkComponent>
    </PageComponent>
  )
}

export default Cart
