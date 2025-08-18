import { createContext, useContext } from "react";
import useProducts from "../hooks/useProducts";

const GlobalContext = createContext()

function GlobalProvider({ children }) {
    const { products, getProductById } = useProducts()
    return (
        <GlobalContext.Provider value={{ products, getProductById }}>
            {children}
        </GlobalContext.Provider>
    )
}

function useGlobal() {
    const context = useContext(GlobalContext)
    return context
}

export { GlobalProvider, useGlobal }