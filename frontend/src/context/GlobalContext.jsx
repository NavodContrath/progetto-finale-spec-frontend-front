import { createContext, useContext, useState, useEffect } from "react";
import useProducts from "../hooks/useProducts";

const GlobalContext = createContext()

function GlobalProvider({ children }) {
    const { products, getProductById } = useProducts()
    const [compareProductIds, setCompareProductIds] = useState([])

    const [wishlist, setWishlist] = useState(() => {
        const saved = localStorage.getItem("wishlist")
        return saved ? JSON.parse(saved) : []

    })


    //COMPARAZIONE//
    function addToCompare(productId) {
        const productToAdd = products.find(p => p.id === productId)
        if (!productToAdd) return
        setCompareProductIds(prev => {
            if (prev.includes(productId)) return prev
            if (prev.length > 0) {
                const firstProduct = products.find(p => p.id === prev[0])
                if (firstProduct.category !== productToAdd.category) {
                    alert("Seleziona prodotti dalla stessa categoria per la comparazione")
                    return prev
                }
            }
            return [...prev, productId]
        })
    }

    function removeCompare(id) {
        setCompareProductIds(prev => prev.filter(productId => productId !== id))
    }
    function clearCompare() {
        setCompareProductIds([])
    }

    //WISHLIST//

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist])

    function toggleWishlist(product) {
        setWishlist(prev => prev.some(p => p.id === product.id) ? prev.filter(p => p.id !== product.id) : [...prev, product])
    }
    function removeFromWishlist(id) {
        setWishlist(prev => prev.filter(p => p.id !== id))
    }


    return (
        <GlobalContext.Provider value={{
            products,
            getProductById,
            compareProductIds,
            addToCompare,
            removeCompare,
            clearCompare,
            wishlist,
            toggleWishlist,
            removeFromWishlist
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