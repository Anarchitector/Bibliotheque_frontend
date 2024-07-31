import Layout from "components/Layout/Layout"
import Home from "pages/Home/Home"
import Login from "pages/Login/Login"
import UserRegistr from "pages/UserRegistr/UserRegistr"
import { BrowserRouter, Routes, Route, } from "react-router-dom"

const App = () => {
  return (
    <BrowserRouter>
     <Layout>
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/api/auth/register" element={<UserRegistr />} />
      <Route path="/api/auth/login" element={<Login />} />
      <Route path='*' element='Page not found' />
      </Routes>
     </Layout>
    </BrowserRouter>
  )
}

export default App
