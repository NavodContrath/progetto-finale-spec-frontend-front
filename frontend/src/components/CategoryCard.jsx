import { Link } from "react-router-dom"

export default function CategoryCard({ product, category }) {
    return (
        <div className="card h-100 p-2 shadow-sm bg-dark">
            <img
                src={`/${product.img}`}
                className="img-fluid"
                style={{ maxHeight: "400px", width: "100%", objectFit: "contain" }}
                alt={product.title}
            />
            <Link
                className={`btn btn-lg rounded-0 mb-2 ${category === "Laptop" ? "btn-success" :
                    category === "Smartphone" ? "btn-info text-white" :
                        "btn-warning text-white"
                    }`}
                to={`/product-list/?category=${category}`}
            >
                {category}
            </Link>
        </div>
    )
}
