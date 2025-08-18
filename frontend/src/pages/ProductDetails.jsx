import { useParams } from "react-router-dom"
import { useGlobal } from "../context/GlobalContext";
import { useEffect, useState } from "react";

export default function ProductDetail() {
    const { id } = useParams()
    const { getProductById } = useGlobal()
    const [product, setProduct] = useState(null)
    console.log(product)

    useEffect(() => {
        async function fetchProduct() {
            try {
                const data = await getProductById(id)
                setProduct(data.product)
            } catch (error) {
                console.log(error.message)
                setProduct(null)
            }
        }
        fetchProduct()
    }, [id])

    if (!product) return <p>Prodotto non trovato</p>
    return (
        <div className="container my-5">
            <h1>{product.title}</h1>
            <p><strong>Categoria:</strong> {product.category}</p>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>Prezzo:</strong> €{product.price}</p>
            {product.releaseYear && (
                <p><strong>Anno di uscita:</strong> {product.releaseYear}</p>
            )}

            {product.platform && (
                <p><strong>Piattaforma:</strong> {product.platform}</p>
            )}
            {product.features?.length > 0 && (
                <div>
                    <strong>Features:</strong>
                    <ul>
                        {product.features.map((f, i) => (
                            <li key={i}>{f}</li>
                        ))}
                    </ul>
                </div>
            )}
            {product.specs?.length > 0 && (
                <div>
                    <strong>Specifiche:</strong>
                    <ul>
                        {product.specs.map((s, i) => (
                            <li key={i}>{s}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}