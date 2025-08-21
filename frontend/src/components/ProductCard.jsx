import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useGlobal } from "../context/GlobalContext"

function ProductCard({ p, onToggle, selected }) {
    const { wishlist, toggleWishlist } = useGlobal()
    const isListed = wishlist.some((item) => item.id === p.id)
    const [isOver, setIsOver] = useState(false)
    return (
        <div className="card h-100 shadow-sm product-card">
            <img
                className="card-img-top"
                to={`/${p.id}`}
                src={p.img ? p.img : "GPT_Image_1_Asus_ROG_Zephyrus_0.png"}
                style={{ maxHeight: "400px", width: "100%", objectFit: "cover" }}
                alt="Image" />
            <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                    <Link
                        className="card-title product-title"
                        to={`/product/${p.id}`}
                    >{p.title}</Link>
                    <p className="card-text product-category">{p.category}</p>
                </div>
                <div className="d-flex align-items-center">
                    <input
                        type="checkbox"
                        name="selected"
                        id={`selected${p.id}`}
                        checked={selected}
                        onChange={onToggle}
                    />
                    <button
                        type="button"
                        className="btn wishlist-btn"
                        onMouseOver={() => setIsOver(true)}
                        onMouseLeave={() => setIsOver(false)}
                        onClick={() => toggleWishlist(p)}>
                        {isOver || isListed ? (
                            <i className="bi bi-heart-fill"></i>
                        ) : (
                            <i className="bi bi-heart"></i>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
export default React.memo(ProductCard)
