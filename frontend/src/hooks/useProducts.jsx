import { useEffect, useState } from "react"

const URL = "http://localhost:3001"

export default function useProducts() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        async function getProducts() {
            try {
                const res = await fetch(`${URL}/products`)
                if (!res.ok) throw new Error("Errore nel caricamento dei prodotti")
                const data = await res.json()
                const detailedProducts = await Promise.all(
                    data.map(p => fetch(`http://localhost:3001/products/${p.id}`)
                        .then(res => res.json())
                        .then(result => result.product)
                    )
                )
                setProducts(detailedProducts)
            } catch (error) {
                console.log(error)
            }
        }
        getProducts()
    }, [])

    async function getProductById(id) {
        const res = await fetch(`${URL}/products/${id}`)
        if (!res.ok) throw new Error("Errore nel caricamento del prodotto")
        const data = await res.json()
        return data
    }
    return {
        products,
        getProductById,
    }
}