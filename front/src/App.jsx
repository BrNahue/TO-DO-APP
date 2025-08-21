import Home from "./Views/Home/Home"
import Login from "./Views/Login/Login"
import Register from "./Views/Register/Register"
import { Route,Routes } from "react-router-dom"

function App() {

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </>
  )
}

export default App
