import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import ShowBooks from "./pages/ShowBooks"
import EditBooks from "./pages/EditBooks"
import CreateBooks from "./pages/CreateBooks"
import DeleteBooks from "./pages/DeleteBooks"

function App() {

  return (
  <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/books/details/:id" element={<ShowBooks/>}></Route>
    <Route path="/books/edit/:id" element={<EditBooks/>}></Route>
    <Route path="/book/create" element={<CreateBooks/>}></Route>
    <Route path="/books/delete/:id" element={<DeleteBooks/>}></Route>
  </Routes>
  )
}

export default App
