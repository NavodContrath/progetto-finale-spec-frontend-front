import { useParams, Link } from "react-router-dom"
import { useGlobal } from "../context/GlobalContext";
import { useEffect, useState } from "react";

export default function ProductDetail() {
    const { id } = useParams()
    const { getProductById, addToCompare, toggleWishlist } = useGlobal()
    const [product, setProduct] = useState(null)

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
        <div className="container w-50 my-5 d-flex justify-content-between border rounded p-3">
            <div>
                <h1 className="text-accent">{product.title}</h1>
                <p><strong>Categoria:</strong> {product.category}</p>
                <p><strong>Brand:</strong> {product.brand}</p>
                {product.price === 0 ? <p><strong>Prezzo:</strong> gratuito</p> : <p><strong>Prezzo:</strong> €{product.price}</p>}
                {product.releaseYear && (
                    <p><strong>Anno di uscita:</strong> {product.releaseYear}</p>
                )}

                {product.platform && (
                    <p><strong>Piattaforma:</strong> {product.platform}</p>
                )}
                {product.features?.length > 0 && (
                    <div className="d-flex">
                        <strong>Features:</strong>
                        <ul className="p-0 ms-1 list-unstyled d-flex" >
                            {product.features.map((f, i) => (
                                <li key={i} className=" ">{f}</li>
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
                <div className="mt-4 d-flex gap-3">
                    <button
                        className="btn btn-success"
                        onClick={() => toggleWishlist(product)}>
                        <i className="bi bi-heart-fill"></i>
                    </button>
                    <button
                        className="btn btn-success"
                        onClick={() => addToCompare(product.id)}>
                        <i class="bi bi-clipboard2-plus-fill"></i>
                    </button>
                    <Link to="/" className="btn btn-accent">Torna alla lista prodotti</Link>
                </div>
            </div>
            <div>
                <img
                    src={`/${product.img}` || "GPT_Image_1_Asus_ROG_Zephyrus_0.png"}
                    alt={product.title}
                    style={{ width: "100%", maxHeight: "400px" }}
                    className="mx-auto mb-3 rounded"
                />
            </div>
        </div>
    )
}