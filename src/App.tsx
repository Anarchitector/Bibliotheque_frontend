import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthorizationForm } from "pages/UserRegistration/styles"
import UserLogin from "components/UserLogin/UserLogin"
import LibraryRegistration from "components/LilbraryRegistration/LibraryRegistration"

const App = () => {
  return ( 
      <BrowserRouter>
      {/* <p>New project</p>
      <p>Home page</p> */ }
      <LibraryRegistration />   

      </BrowserRouter>   
  )
}

export default App
