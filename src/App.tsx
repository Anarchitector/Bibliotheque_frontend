import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthorizationForm } from "pages/UserRegistration/styles"
import UserLogin from "components/UserLogin/UserLogin"

const App = () => {
  return ( 
      <BrowserRouter>
      {/* <p>New project</p>
      <p>Home page</p> */ }
      <UserLogin />   

      </BrowserRouter>   
  )
}

export default App
