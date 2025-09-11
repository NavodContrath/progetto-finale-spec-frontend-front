import { useEffect, useState } from "react"

const URL = "http://localhost:3001"

export default function useProducts() {
    const [products, setProducts] = useState([])

    //fetch di tutti prodotti con Promise.all per raccogliere tutti i dettagli
    useEffect(() => {
        async function getProducts() {
            try {
                const res = await fetch(`${URL}/products`)
                if (!res.ok) throw new Error("Errore nel caricamento dei prodotti")
                const data = await res.json()
                //Promise.all mappato per tutti gli elementi in database restituisce un array che poi viene trasformato
                const detailedProducts = (await Promise.all(data.map(p => getProductById(p.id)))).map(res => res.product)
                setProducts(detailedProducts)
            } catch (error) {
                console.log(error)
            }
        }
        getProducts()
    }, [])
    //fetch singolo prodotto
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