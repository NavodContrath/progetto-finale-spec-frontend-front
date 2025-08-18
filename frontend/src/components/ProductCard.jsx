import React from "react"
import { Link } from "react-router-dom"

function ProductCard({ p }) {
    return (
        <Link to={`/${p.id}`} className="card h-100 shadow-sm">
            <img className="card-img-top" src="fsdfdss.jpg" alt="Title" />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.title}</h5>
                <p className="card-text text-muted">{p.category}</p>
            </div>
        </Link>
    )
}

export default React.memo(ProductCard)