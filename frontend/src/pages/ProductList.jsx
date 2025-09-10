import { useCallback, useEffect, useMemo, useState } from "react";
import { useGlobal } from "../context/GlobalContext";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import InfoBanner from "../components/InfoBanner";



export default function ProductList() {

    const { products, addToCompare, compareProductIds, clearCompare } = useGlobal()
    const navigate = useNavigate()
    const location = useLocation()
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)
    const [debouncedSearch, setDebouncedSearch] = useState(search)
    const queryParams = new URLSearchParams(location.search)
    const intialCategory = queryParams.get("category") || "Tutto"
    const [categoryFilter, setCategoryFilter] = useState(intialCategory)
    const [sortOrder, setSortOrder] = useState("A-z")
    const [selectedIds, setSelectedIds] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const productsPerPage = 8

    function debounce(callback, delay) {
        let timer
        return (value) => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                callback(value)
            }, delay)
        };
    }

    //filtering/sorting products
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

    const toggleSortOrder = () => setSortOrder(prev => (prev === "A-z" ? "Z-a" : "A-z"))

    //search and debouncer
    const handleSearch = (e) => {
        setSearch(e.target.value)
        setLoading(true)
        debounceSearch(e.target.value)
    }

    const debounceSearch = useCallback(debounce((value) => {
        setDebouncedSearch(value)
        setLoading(false)
    }, 500), []
    )

    //categories from url
    useEffect(() => {
        const categoryFromUrl = new URLSearchParams(location.search).get("category") || "Tutto"
        setCategoryFilter(categoryFromUrl)
    }, [location.search])

    useEffect(() => {
        if (categoryFilter === "Tutto") {
            navigate("/product-list");
        } else {
            navigate(`/product-list?category=${categoryFilter}`);
        }
    }, [categoryFilter, navigate])

    const categories = useMemo(() => {
        const c = ["Tutto"]
        products.forEach(p => {
            if (!c.includes(p.category)) c.push(p.category)
        });
        return c
    }, [products])

    const handleCategoryChange = (e) => {
        setCategoryFilter(e.target.value)
        setLoading(true)
        setTimeout(() => setLoading(false), 500)
    }

    //multi selection and handler of compare
    const toggleSelection = useCallback((productId) => {
        setSelectedIds(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
        )
    }, [])

    const addHandler = () => {
        selectedIds.forEach(id => addToCompare(id))
        setSelectedIds([])
        navigate("/compare")
    }

    //pagination logic
    const startIndex = (currentPage - 1) * productsPerPage
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage)

    useEffect(() => {
        setCurrentPage(1)
    }, [debouncedSearch, categoryFilter])

    return (
        <div className="container my-5">
            <h1 className="text-accent">Catalogo Prodotti</h1>
            <div className="row g-3 my-3 align-items-center">
                <div className="col-12 d-flex flex-column flex-md-row justify-content-between mt-3 gap-2">
                    <button className="btn btn-outline-light" onClick={toggleSortOrder}>
                        Ordina {sortOrder === "A-z" ? "A → Z" : "Z → A"}
                    </button>
                    {selectedIds.length > 0 && (
                        <button className="btn btn-accent" onClick={addHandler}>
                            Aggiungi selezionati alla comparazione
                        </button>
                    )}
                    {compareProductIds.length > 0 && (
                        <button className="btn btn-accent" onClick={clearCompare}>
                            Svuota comparazione
                        </button>
                    )}
                </div>
                <div className="col-12 col-md-8">
                    <input
                        type="text"
                        placeholder="Cerca prodotto..."
                        className="form-control search-input"
                        value={search}
                        onChange={handleSearch}
                    />
                </div>
                <div className="col-12 col-md-4">
                    <select
                        className="form-select category-select"
                        value={categoryFilter}
                        onChange={handleCategoryChange}
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
                        info={"Prego attendere la fine del caricamento..."}
                    />
                ) : paginatedProducts.length > 0 ? (
                    paginatedProducts.map((p) => (
                        <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
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
                        search={search}
                    />
                )}
            </div>

            {totalPages > 1 && (
                <div className="d-flex flex-column flex-md-row justify-content-center align-items-center mt-4 gap-2">
                    <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        <i className="bi bi-arrow-left"></i>
                    </button>
                    <span>Pagina {currentPage} di {totalPages}</span>
                    <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        <i className="bi bi-arrow-right"></i>
                    </button>
                </div>
            )}
        </div>

    )
}