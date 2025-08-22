import { useCallback, useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useGlobal } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import InfoBanner from "../components/InfoBanner";

export default function ProductList() {
    const { products, addToCompare } = useGlobal()
    const navigate = useNavigate()
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)
    const [debouncedSearch, setDebouncedSearch] = useState(search)
    const [categoryFilter, setCategoryFilter] = useState("Tutto")
    const [sortOrder, setSortOrder] = useState("A-z")
    const [selectedIds, setSelectedIds] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const productsPerPage = 8

    useEffect(() => {
        setLoading(true)
        const handler = setTimeout(() => {
            setLoading(false)
        }, 300)

        return () => clearTimeout(handler)
    }, [debouncedSearch, categoryFilter, products])

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

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const toggleSortOrder = () => setSortOrder(prev => (prev === "A-z" ? "Z-a" : "A-z"))

    const toggleSelection = useCallback((productId) => {
        setSelectedIds(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
        )
    }, [])

    const addHandler = () => {
        selectedIds.forEach(id => addToCompare(id))
        setSelectedIds([])
        navigate("/compare")
    }

    const startIndex = (currentPage - 1) * productsPerPage
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage)

    return (
        <div className="container my-5">
            <div className="row g-3 my-3">
                <div className="d-flex justify-content-between mt-3 ">
                    <button className="btn btn-outline-light" onClick={toggleSortOrder}>
                        Ordina {sortOrder === "A-z" ? "A → Z" : "Z → A"}
                    </button>

                    {selectedIds.length > 0 && (
                        <button className="btn btn-accent" onClick={addHandler}>
                            Aggiungi selezionati alla comparazione
                        </button>
                    )}
                </div>
                <div className="col-md-8">
                    <input
                        type="text"
                        placeholder="Cerca prodotto..."
                        className="form-control search-input"
                        value={search}
                        onChange={handleSearch}
                    />
                </div>
                <div className="col-md-4">
                    <select
                        className="form-select category-select"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        {categories.map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="row g-4">
                {loading ? (
                    <InfoBanner
                        error={"Sto Caricando"}
                        info={"Prego attendere la fine del caricamento..."} />
                ) : paginatedProducts.length > 0 ? (
                    paginatedProducts.map((p) => (
                        <div key={p.id} className="col-6 col-md-4 col-lg-3">
                            <ProductCard
                                p={p}
                                selected={selectedIds.includes(p.id)}
                                onToggle={() => toggleSelection(p.id)}
                            />
                        </div>
                    ))
                ) : (
                    <InfoBanner
                        error={"Nessun risultato trovato"}
                        info={"Non ci sono prodotti che corrispondono a"}
                        search={search} />
                )}
            </div>

            {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4 gap-2">
                    <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        ← Prev
                    </button>
                    <span>Pagina {currentPage} di {totalPages}</span>
                    <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next →
                    </button>
                </div>
            )}
        </div>)
}