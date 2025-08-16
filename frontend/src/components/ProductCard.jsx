import React from "react"

function ProductCard({ p }) {
    return (
        <div className="card h-100 shadow-sm">
            <img className="card-img-top" src="fsdfdss.jpg" alt="Title" />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.title}</h5>
                <p className="card-text text-muted">{p.category}</p>
            </div>
        </div>
    )
}

export default React.memo(ProductCard)