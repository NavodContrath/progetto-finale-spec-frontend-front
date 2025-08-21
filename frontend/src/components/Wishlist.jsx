import React, { useState } from "react"
import ReactDOM from "react-dom"
import { useGlobal } from "../context/GlobalContext"
import { Link } from "react-router-dom"

export default function Wishlist() {
    const { wishlist, removeFromWishlist, addToCompare } = useGlobal()
    const wishlistRoot = document.getElementById("wishlist-root")
    const [open, setOpen] = useState(false)

    if (!wishlistRoot) return null

    return ReactDOM.createPortal(
        <div className="wishlist-dropdown position-relative">
            <div
                onClick={() => setOpen(!open)}
                style={{ cursor: "pointer" }}
            >
                {wishlist.length > 0 ? <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart"></i>}
                {wishlist.length > 0 && (
                    <span className="badge bg-danger ms-1">{wishlist.length}</span>
                )}
            </div>

            {open && (
                <div
                    className="wishlist-menu bg-dark shadow rounded p-2 position-absolute end-0 mt-2"
                    style={{ minWidth: "400px", zIndex: 1050 }}
                >
                    {wishlist.length === 0 ? (
                        <p className="text-muted m-0">Nessun preferito</p>
                    ) : (
                        <ul className="list-unstyled m-0 p-2">
                            {wishlist.map((p) => (
                                <li key={p.id} className="mb-2 row border-bottom-accent">
                                    <Link
                                        className="text-decoration-none text-accent col-8"
                                        to={`/product/${p.id}`}
                                        onClick={() => setOpen(false)
                                        }>
                                        {p.title}
                                    </Link>
                                    <div className="col-4 text-end">
                                        <i
                                            className="bi bi-heartbreak text-white"
                                            onClick={() => removeFromWishlist(p.id)}
                                            style={{ cursor: "pointer" }}
                                        ></i>
                                        <i
                                            className="bi bi-clipboard2-plus ms-2 text-white"
                                            onClick={() => addToCompare(p.id)}
                                            style={{ cursor: "pointer" }}></i>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>,
        wishlistRoot
    )
}
