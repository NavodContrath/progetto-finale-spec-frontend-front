import { createContext, useContext, useState } from "react";
import useProducts from "../hooks/useProducts";

const GlobalContext = createContext()

function GlobalProvider({ children }) {
    const { products, getProductById } = useProducts()
    const [compareProductIds, setCompareProductIds] = useState([])

    //COMPARAZIONE//
    function addToCompare(productId) {
        setCompareProductIds(prev => {
            if (prev.includes(productId)) return prev
            if (prev.length < 2) return [...prev, productId]
            alert("Puoi selezionare massimo 2 prodotti per la comparazione")
            return prev
        })
    }

    function removeCompare(id) {
        setCompareProductIds(prev => prev.filter(productId => productId !== id))
    }
    function clearCompare() {
        setCompareProductIds([])
    }

    return (
        <GlobalContext.Provider value={{
            products,
            getProductById,
            compareProductIds,
            addToCompare,
            removeCompare,
            clearCompare
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

function useGlobal() {
    const context = useContext(GlobalContext)
    return context
}

export { GlobalProvider, useGlobal }