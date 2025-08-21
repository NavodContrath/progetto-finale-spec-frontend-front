import { useEffect, useState } from "react";
import { useGlobal } from "../context/GlobalContext";
import { Link } from "react-router-dom";

export default function CompareProducts() {
    const { compareProductIds, getProductById, removeCompare, toggleWishlist } = useGlobal();
    const [compareProducts, setCompareProducts] = useState([]);

    useEffect(() => {
        async function fetchToCompare() {
            const data = await Promise.all(compareProductIds.map(id => getProductById(id)));
            setCompareProducts(data);
        }
        fetchToCompare();
    }, [compareProductIds, getProductById]);

    if (compareProducts.length === 0) {
        return (
            <div className="container my-5">
                <div
                    className="d-flex flex-column justify-content-center align-items-center p-5 border rounded empty-box"
                    style={{ minHeight: "200px" }}
                >
                    <h4>Nessun prodotto selezionato per la comparazione</h4>
                    <Link to="/" className="btn btn-accent mt-3">Torna alla lista prodotti</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container my-5 text-light">
            <h1 className="text-accent">Comparazione Prodotti</h1>
            <div className="mb-4">
                <Link to="/" className="text-decoration-none" >Torna alla lista prodotti</Link>
            </div>
            <div className="row g-4">
                {compareProducts.map(item => {
                    const product = item.product;
                    return (
                        <div
                            key={product.id}
                            className="col-12 col-md-6 col-lg-4"
                        >
                            <div className="card bg-dark text-light shadow-sm h-100 d-flex flex-column justify-content-between p-3">
                                <img
                                    src={product.img || "GPT_Image_1_Asus_ROG_Zephyrus_0.png"}
                                    alt={product.title}
                                    style={{ width: "80%", maxHeight: "400px" }}
                                    className="mx-auto mb-3 rounded"
                                />

                                <div className="mb-3">
                                    <h2 className="text-accent">{product.title}</h2>
                                    <p><strong>Categoria:</strong> {product.category}</p>
                                    <p><strong>Brand:</strong> {product.brand}</p>
                                    {product.price === 0 ? <p><strong>Prezzo:</strong> gratuito</p> : <p><strong>Prezzo:</strong> €{product.price}</p>}
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
                                    className="btn btn-danger mt-auto"
                                    onClick={() => removeCompare(product.id)}
                                >
                                    Rimuovi dalla comparazione
                                </button>
                                <button
                                    className="btn btn-success mt-2"
                                    onClick={() => toggleWishlist(product)}
                                >
                                    Aggiungi ai preferiti
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
