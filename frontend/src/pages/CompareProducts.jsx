import { useEffect, useState } from "react";
import { useGlobal } from "../context/GlobalContext";
import { Link } from "react-router-dom";
export default function CompareProducts() {
    const { compareProductIds, getProductById, removeCompare } = useGlobal()
    const [compareProducts, setCompareProducts] = useState([])
    console.log(compareProducts)

    useEffect(() => {
        async function fetchToCompare() {
            const data = await Promise.all(compareProductIds.map(id => getProductById(id)))
            setCompareProducts(data)
        }
        fetchToCompare()
    }, [compareProductIds, getProductById])


    if (compareProducts.length === 0) {
        return (
            <div className="container my-5">
                <p>Nessun prodotto selezionato per la comparazione.</p>
                <Link to="/">Torna alla lista prodotti</Link>
            </div>
        )

    }
    return (
        <div className="container my-5">
            <h1>Comparazione Prodotti</h1>
            <div className="row mt-4">
                {compareProducts.map(item => {
                    const product = item.product
                    return (
                        <div
                            key={product.id}
                            className="card col-4 p-3 shadow-sm d-flex flex-column justify-content-between"

                        >
                            <img
                                src={product.img || "GPT_Image_1_Asus_ROG_Zephyrus_0.png"}
                                alt={product.title}
                                style={{ width: "100%", maxHeight: "400px", objectFit: "contain" }}
                                className="card-img-top mb-3"
                            />

                            <div>
                                <h2>{product.title}</h2>
                                <p><strong>Categoria:</strong> {product.category}</p>
                                <p><strong>Brand:</strong> {product.brand}</p>
                                <p><strong>Prezzo:</strong> €{product.price}</p>
                                {product.releaseYear && <p><strong>Anno di uscita:</strong> {product.releaseYear}</p>}
                                {product.platform && <p><strong>Piattaforma:</strong> {product.platform}</p>}
                                {product.features?.length > 0 && (
                                    <div>
                                        <strong>Features:</strong>
                                        <ul>{product.features.map((f, i) => <li key={i}>{f}</li>)}</ul>
                                    </div>
                                )}
                                {product.specs?.length > 0 && (
                                    <div>
                                        <strong>Specifiche:</strong>
                                        <ul>{product.specs.map((s, i) => <li key={i}>{s}</li>)}</ul>
                                    </div>
                                )}
                            </div>
                            <button
                                className="btn btn-danger mt-3"
                                onClick={() => removeCompare(product.id)}
                            >
                                Rimuovi dalla comparazione
                            </button>

                        </div>
                    )

                })}

            </div>

            <Link to="/" className="btn btn-primary mt-4">Torna alla lista prodotti</Link>
        </div>
    )
}