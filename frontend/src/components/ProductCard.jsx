import React from "react"
import { Link } from "react-router-dom"

function ProductCard({ p, onToggle, selected }) {
    return (
        <div className="card h-100 shadow-sm">
            <img
                className="card-img-top"
                to={`/${p.id}`}
                src="GPT_Image_1_Asus_ROG_Zephyrus_0.png"
                style={{ height: "300px", objectFit: "cover" }}
                alt="Image" />
            <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                    <Link
                        className="card-title"
                        to={`/${p.id}`}
                    >{p.title}</Link>
                    <p className="card-text text-muted">{p.category}</p>
                </div>
                <input
                    type="checkbox"
                    name="selcted"
                    id={`selected${p.id}`}
                    checked={selected}
                    onChange={onToggle} />
            </div>


        </div>
    )
}

export default React.memo(ProductCard)