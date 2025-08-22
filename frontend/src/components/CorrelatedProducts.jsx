import { useMemo } from "react"
import ProductCard from "./ProductCard"

export default function CorrelatedProducts({ product, products }) {
    const correlatedProducts = useMemo(() => {
        if (!product) return []
        const sameCategory = products.filter(
            (p) => p.category === product.category && p.id !== product.id
        )
        const randomized = [...sameCategory].sort(() => 0.5 - Math.random())
        return randomized.slice(0, 4)
    }, [product, products])
    return (
        <>
            {correlatedProducts.length > 0 && (
                <div className="container mt-5">
                    <h3 className="mb-4">Prodotti correlati</h3>
                    <div className="row g-4">
                        {correlatedProducts.map((p) => (
                            <div key={p.id} className="col-6 col-md-3">
                                <ProductCard p={p} />
                            </div>
                        ))}
                    </div>
                </div>
            )}</>
    )
}