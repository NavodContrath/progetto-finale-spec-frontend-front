import { useEffect, useState } from "react"
import { useGlobal } from "../context/GlobalContext"
import InfoBanner from "../components/InfoBanner"
import { Link } from "react-router-dom"
import CategoriesSection from "../components/CategoriesSection"

function getRandomProductByCategory(products, category) {
    const filtered = products.filter(p => p.category === category)
    if (!filtered.length) return null
    const randomIndex = Math.floor(Math.random() * filtered.length)
    return filtered[randomIndex]
}

export default function Homepage() {
    const { products, getProductById } = useGlobal()
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const categories = ["Laptop", "Smartphone", "Game"]

    useEffect(() => {
        async function fetchRandomProducts() {
            setLoading(true)
            try {
                const result = {}
                for (let category of categories) {
                    const randomProduct = getRandomProductByCategory(products, category)
                    if (randomProduct) {
                        const data = await getProductById(randomProduct.id)
                        result[category] = data.product
                    }
                }
                setProduct(result)
            } catch (error) {
                console.log(error.message)
                setProduct(null)
            } finally {
                setLoading(false)
            }
        }

        fetchRandomProducts()
    }, [products])

    if (loading) return <InfoBanner error={"Sto Caricando"} info={"Prego attendere la fine del caricamento..."} />


    return (
        <>
            <div className="container">
                <div className=" mb-4 bg-dark rounded-3 mt-5">
                    <div className="container py-3 d-flex flex-column align-items-center">
                        <div className="text-center">
                            <h1 className="display-4 fw-bold text-accent">COMPARA</h1>
                            <h2 className="display-5 fw-bold text-white">i tuoi prodotti preferiti in un click!</h2>
                            <h3 className="display-6 fw-bold text-white">al momento abbiamo <strong className="text-primary">{products.length}</strong> prodotti in catalogo.</h3>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <h3 className="text-center">Scegli tra le nostre categorie di prodotti:</h3>
                    <CategoriesSection productsByCategory={product} categories={categories} />

                </div>
                <div className="mt-4">
                    <h3>Oppure visualizza tutti i nostri<Link to="/product-list" className="text-decoration-none" > prodotti</Link></h3>

                </div>

            </div>
        </>
    )
}