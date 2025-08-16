import { useCallback, useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useGlobal } from "../context/GlobalContext";
export default function ProductList() {
    const { products } = useGlobal()

    const [search, setSearch] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search)
        }, 300)

        return () => clearTimeout(handler)
    }, [search])

    const filteredProducts = useMemo(() => {
        let filtered = products
        if (search) {
            filtered = filtered.filter(p => {
                return p.title.trim().toLowerCase().includes(debouncedSearch.trim().toLowerCase())
            })
        }
        return filtered
    }, [products, debouncedSearch])

    const handleSearch = useCallback((e) => {
        setSearch(e.target.value)
    }, [])
    return (
        <>
            <div className="container my-5">
                <input
                    type="text"
                    placeholder="Cerca prodotto..."
                    className="form-control my-3"
                    value={search}
                    onChange={handleSearch}
                />
                <div className="row g-4">
                    {filteredProducts.map((p) => (
                        <div key={p.id} className="col-12 col-md-6 col-lg-4">
                            <ProductCard p={p} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )

}