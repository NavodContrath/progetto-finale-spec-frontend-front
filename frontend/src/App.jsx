import { BrowserRouter, Routes, Route } from "react-router-dom"
import { GlobalProvider } from "./context/GlobalContext"
import DefaultLayout from "./layout/DefaultLayout"
import ProductList from "./pages/ProductList"
import ProductDetail from "./pages/ProductDetails"
import CompareProducts from "./pages/CompareProducts"
import ScrollToTop from "./components/ScrollToTop"
import Homepage from "./pages/Homepage"

function App() {


  return (
    <GlobalProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path='/' element={<Homepage />} />
            <Route path='/product-list' element={<ProductList />} />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route path='/compare' element={<CompareProducts />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
