import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useGlobal } from "../context/GlobalContext"

function ProductCard({ p, onToggle, selected }) {
    const { wishlist, toggleWishlist, compareProductsIds, addToCompare } = useGlobal()
    const isListed = wishlist.some(item => item.id === p.id)
    const isCompared = compareProductsIds?.some(id => id === p.id)
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
                alt="Image" />
            <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                    <Link
                        className="card-title product-title"
                        to={`/product/${p.id}`}
                    >{p.title}</Link>
                    <p className={`card-text product-category ${categoryColor[p.category]}`}>{p.category}</p>
                </div>
                <div className="d-flex align-items-center">
                    <button
                        type="button"
                        className="btn wishlist-btn"
                        onMouseOver={() => setIsOverCompare(true)}
                        onMouseLeave={() => setIsOverCompare(false)}
                        onClick={() => addToCompare(p.id)}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Aggiungi prodotto al comparatore">
                        {isOverCompare || isCompared ? (
                            <i class="bi bi-clipboard2-plus-fill"></i>
                        ) : (
                            <i class="bi bi-clipboard2-plus text-white"></i>
                        )}
                    </button>
                    <button
                        type="button"
                        className="btn wishlist-btn"
                        onMouseOver={() => setIsOverWish(true)}
                        onMouseLeave={() => setIsOverWish(false)}
                        onClick={() => toggleWishlist(p)}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Aggiungi/rimuovi dalla wishlist">
                        {isOverWish || isListed ? (
                            <i className="bi bi-heart-fill"></i>
                        ) : (
                            <i className="bi bi-heart"></i>
                        )}
                    </button>
                    <input
                        type="checkbox"
                        name="selected"
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
