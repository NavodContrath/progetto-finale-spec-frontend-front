import { useEffect, useState } from "react";
import { useGlobal } from "../context/GlobalContext";
import { Link } from "react-router-dom";
import InfoBanner from "../components/InfoBanner";

export default function CompareProducts() {
    const { compareProductIds, getProductById, removeCompare, toggleWishlist } = useGlobal()
    const [compareProducts, setCompareProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchToCompare() {
            setLoading(true)
            try {
                const data = await Promise.all(compareProductIds.map(id => getProductById(id)))
                setCompareProducts(data)
            } catch (err) {
                console.error(err)
                setCompareProducts([])
            } finally {
                setLoading(false);
            }
        }

        if (compareProductIds.length > 0) {
            fetchToCompare()
        } else {
            setCompareProducts([])
            setLoading(false)
        }
    }, [compareProductIds, getProductById])

    if (!loading && compareProducts.length === 0) {
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
    if (loading) return <InfoBanner error={"Sto Caricando"} info={"Prego attendere la fine del caricamento..."} />

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
                                        <div className="d-flex align-items-center flex-wrap mb-2">
                                            <strong className="me-2">Features:</strong>
                                            <div className="d-flex flex-wrap gap-2">
                                                {product.features.map((feature, i) => (
                                                    <span
                                                        key={i}
                                                        className={`badge ${[
                                                            "bg-primary",
                                                            "bg-danger",
                                                            "bg-warning text-dark",
                                                            "bg-info text-dark"
                                                        ][i % 4]}`}
                                                    >
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {product.specs?.length > 0 && (
                                        <div className="d-flex align-items-center flex-wrap">
                                            <strong className="me-2">Specifiche:</strong>
                                            <div className="d-flex flex-wrap gap-2">
                                                {product.specs.map((spec, i) => (
                                                    <span
                                                        key={i}
                                                        className={`badge ${[
                                                            "bg-warning text-dark",
                                                            "bg-dark",
                                                            "bg-info text-dark",
                                                            "bg-danger",
                                                        ][i % 4]}`}
                                                    >
                                                        {spec}
                                                    </span>
                                                ))}
                                            </div>
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
