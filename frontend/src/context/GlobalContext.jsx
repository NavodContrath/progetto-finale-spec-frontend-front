import { createContext, useContext } from "react";
import useProducts from "../hooks/useProducts";

const GlobalContext = createContext()

function GlobalProvider({ children }) {
    const { products } = useProducts()
    return (
        <GlobalContext.Provider value={{ products }}>
            {children}
        </GlobalContext.Provider>
    )
}

function useGlobal() {
    const context = useContext(GlobalContext)
    return context
}

export { GlobalProvider, useGlobal }