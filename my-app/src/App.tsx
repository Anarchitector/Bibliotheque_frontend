import FormRegistrUser from "components/FormRegistUser/FormRegistrUser"
import { BrowserRouter, Routes, Route } from "react-router-dom"

const App = () => {
  return (
    <BrowserRouter>
     {/* <p>New project</p> */}
     {/* <p>Home page</p> */}
     <FormRegistrUser />
    </BrowserRouter>
  )
}

export default App
