import { useParams, Link } from "react-router-dom"
import { useGlobal } from "../context/GlobalContext";
import { useEffect, useState } from "react";
import CorrelatedProducts from "../components/CorrelatedProducts";
import InfoBanner from "../components/InfoBanner";

export default function ProductDetail() {
    const { id } = useParams()
    const { getProductById, addToCompare, toggleWishlist, products } = useGlobal()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    //fetch singolo prodotto per dettagli
    useEffect(() => {
        async function fetchProduct() {
            setLoading(true)
            try {
                const data = await getProductById(id)
                setProduct(data.product)
            } catch (error) {
                console.log(error.message)
                setProduct(null)
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id])

    if (loading) return <InfoBanner error={"Sto Caricando"} info={"Prego attendere la fine del caricamento..."} />

    if (!product) return <InfoBanner error={"404 notFound"} info={`Prodotto con id ${id} non trovato`} />
    return (
        <>
            <div className="container   my-5 border rounded p-3"
                style={{ width: "60%" }}>
                <div className="row g-4 align-items-start">
                    <div className="col-12 col-lg-6 order-1 order-lg-2 d-flex justify-content-center">
                        <img
                            src={`/${product.img}` || "GPT_Image_1_Asus_ROG_Zephyrus_0.png"}
                            alt={product.title}
                            className="img-fluid rounded"
                            style={{ maxHeight: "400px" }}
                        />
                    </div>

                    <div className="col-12 col-lg-6 order-2 order-lg-1">
                        <h1 className="text-accent">{product.title}</h1>
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
                                        <span key={i} className={`badge ${["bg-primary", "bg-danger", "bg-warning text-dark", "bg-info text-dark"][i % 4]}`}>{feature}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {product.specs?.length > 0 && (
                            <div className="d-flex align-items-center flex-wrap">
                                <strong className="me-2">Specifiche:</strong>
                                <div className="d-flex flex-wrap gap-2">
                                    {product.specs.map((spec, i) => (
                                        <span key={i} className={`badge ${["bg-warning text-dark", "bg-dark", "bg-info text-dark", "bg-danger"][i % 4]}`}>{spec}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-4 d-flex flex-column flex-md-row gap-3">
                            <button className="btn btn-success" onClick={() => toggleWishlist(product)}>
                                <i className="bi bi-heart-fill"></i>
                            </button>
                            <button className="btn btn-success" onClick={() => addToCompare(product.id)}>
                                <i className="bi bi-clipboard2-plus-fill"></i>
                            </button>
                            <Link to="/product-list" className="btn btn-accent">Torna alla lista prodotti</Link>
                        </div>
                    </div>
                </div>
            </div>

            <CorrelatedProducts product={product} products={products} />
        </>


    )
}