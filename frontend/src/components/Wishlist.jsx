import React, { useState, useEffect, useRef } from "react"
import ReactDOM from "react-dom"
import { useGlobal } from "../context/GlobalContext"
import { Link } from "react-router-dom"

export default function Wishlist() {
    const { wishlist, removeFromWishlist } = useGlobal()
    const wishlistRoot = document.getElementById("wishlist-root")
    const [open, setOpen] = useState(false)
    const ref = useRef()

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    if (!wishlistRoot) return null

    return ReactDOM.createPortal(
        <div className="wishlist-dropdown position-relative" ref={ref}>
            <div
                onClick={() => setOpen(!open)}
            >
                {wishlist.length > 0 ? <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart"></i>}
                {wishlist.length > 0 && (
                    <span className="badge bg-danger ms-1">{wishlist.length}</span>
                )}
            </div>

            {open && (
                <div
                    className="wishlist-menu bg-white shadow rounded p-2 position-absolute end-0 mt-2"
                    style={{ minWidth: "400px", zIndex: 1050 }}
                >
                    {wishlist.length === 0 ? (
                        <p className="text-muted m-0">Nessun preferito</p>
                    ) : (
                        <ul className="list-unstyled m-0 p-2">
                            {wishlist.map((p) => (
                                <li key={p.id} className="mb-2 row border-bottom border-primary">
                                    <Link
                                        className="text-decoration-none col-8"
                                        to={`/product/${p.id}`}
                                        onClick={() => setOpen(false)
                                        }>
                                        {p.category.title}
                                    </Link>
                                    <div className="col-4 text-end">
                                        <i className="bi bi-heartbreak text-black"></i>
                                        <i className="bi bi-clipboard2-plus ms-2 text-black"></i>
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
