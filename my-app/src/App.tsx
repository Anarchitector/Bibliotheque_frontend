import Layout from "components/Layout/Layout"
import Home from "pages/Home/Home"
import Login from "pages/Login/Login"
import PagePersonalCabinet from "pages/PagePersonalCabinet/PagePersonalCabinet"
import RegistLoginError from "pages/RegistrLoginError/RegistrLoginError"
import UserRegistr from "pages/UserRegistr/UserRegistr"
import { Provider } from "react-redux"
import { BrowserRouter, Routes, Route, } from "react-router-dom"
import { store } from "store/store"

const App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter>
     <Layout>
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/api/auth/register" element={<UserRegistr />} />
      <Route path="/api/auth/login" element={<Login />} />
      <Route path="/api/auth/error" element={<RegistLoginError />} />
      <Route path="/api/users/:id" element={<PagePersonalCabinet />} />
      <Route path='*' element='Page not found' />
      </Routes>
     </Layout>
    </BrowserRouter>
    </Provider>
  )
}

export default App
