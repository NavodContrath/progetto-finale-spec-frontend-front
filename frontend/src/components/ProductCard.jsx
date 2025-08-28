import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useGlobal } from "../context/GlobalContext"

function ProductCard({ p, onToggle, selected }) {
    const { wishlist, toggleWishlist, compareProductIds, addToCompare } = useGlobal()
    const isListed = wishlist.some(item => item.id === p.id)
    const isCompared = compareProductIds?.includes(p.id)
    const [isOverWish, setIsOverWish] = useState(false)
    const [isOverCompare, setIsOverCompare] = useState(false)
    const categoryColor = {
        Laptop: "text-success",
        Smartphone: "text-info",
        Game: "text-warning"
    }

    return (
        <div className="card h-100 shadow-sm product-card">
            <img
                className="card-img-top"
                src={`/${p.img}`}
                style={{ maxHeight: "400px", width: "100%", objectFit: "cover" }}
                alt="Image"
            />
            <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
                <div className="flex-grow-1">
                    <Link className="card-title product-title" to={`/product/${p.id}`} style={{ maxWidth: '70%' }}>
                        {p.title}
                    </Link>
                    <p className={`card-text product-category ${categoryColor[p.category]}`}>{p.category}</p>
                </div>
                <div className="d-flex align-items-center gap-2 flex-nowrap">
                    <button
                        type="button"
                        className="btn wishlist-btn"
                        onMouseOver={() => setIsOverCompare(true)}
                        onMouseLeave={() => setIsOverCompare(false)}
                        onClick={() => addToCompare(p.id)}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={isCompared ? "Rimuovi prodotto dal comparatore" : "Aggiungi prodotto al comparatore"}
                    >
                        {isOverCompare || isCompared ? (
                            <i className="bi bi-clipboard2-plus-fill text-accent"></i>
                        ) : (
                            <i className="bi bi-clipboard2-plus text-white"></i>
                        )}
                    </button>
                    <button
                        type="button"
                        className="btn wishlist-btn me-1"
                        onMouseOver={() => setIsOverWish(true)}
                        onMouseLeave={() => setIsOverWish(false)}
                        onClick={() => toggleWishlist(p)}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={isListed ? "Rimuovi dalla wishlist" : "Aggiungi alla wishlist"}
                    >
                        {isOverWish || isListed ? (
                            <i className="bi bi-heart-fill"></i>
                        ) : (
                            <i className="bi bi-heart"></i>
                        )}
                    </button>
                    <input
                        type="checkbox"
                        name="selected"
                        className="me-1"
                        id={`selected${p.id}`}
                        checked={selected}
                        onChange={onToggle}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Selezione multipla per comparazione"
                        style={{ cursor: "pointer" }}
                    />
                </div>
            </div>
        </div>

    )
}
export default React.memo(ProductCard)
