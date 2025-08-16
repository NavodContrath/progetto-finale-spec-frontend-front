import { useCallback, useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useGlobal } from "../context/GlobalContext";

export default function ProductList() {
    const { products } = useGlobal()
    const [search, setSearch] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState(search)
    const [categoryFilter, setCategoryFilter] = useState("Tutto")
    const [sortOrder, setSortOrder] = useState("A-z")

    const categories = useMemo(() => {
        const c = ["Tutto"]
        products.forEach(p => {
            if (!c.includes(p.category)) c.push(p.category)
        });
        return c
    }, [products])

    const filteredProducts = useMemo(() => {
        let filtered = products.filter(p => {
            const filteredSearch = p.title.trim().toLowerCase().includes(debouncedSearch.trim().toLowerCase())
            const filteredCategory = categoryFilter === "Tutto" || p.category === categoryFilter
            return filteredSearch && filteredCategory
        })

        filtered.sort((a, b) => {
            if (sortOrder === "A-z") return a.title.localeCompare(b.title);
            return b.title.localeCompare(a.title);
        })

        return filtered
    }, [products, debouncedSearch, categoryFilter, sortOrder])

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search)
        }, 300)

        return () => clearTimeout(handler)
    }, [search])

    const handleSearch = useCallback((e) => {
        setSearch(e.target.value)
    }, [])

    const toggleSortOrder = () => setSortOrder(prev => (prev === "A-z" ? "Z-a" : "A-z"))


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
                <div className="d-flex gap-3 my-3">
                    <select
                        className="form-select"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        {categories.map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>

                    <button className="btn btn-outline-primary" onClick={toggleSortOrder}>
                        Ordina {sortOrder === "A-z" ? "A → Z" : "Z → A"}
                    </button>
                </div>
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