import { BrowserRouter, Routes, Route } from "react-router-dom"
import { GlobalProvider } from "./context/GlobalContext"
import DefaultLayout from "./layout/DefaultLayout"
import ProductList from "./pages/ProductList"
import ProductDetail from "./pages/ProductDetails"

function App() {


  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path='/' element={<ProductList />} />
            <Route path='/:id' element={<ProductDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
