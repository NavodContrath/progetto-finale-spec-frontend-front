import { NavLink, Outlet } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import Wishlist from "../components/Wishlist";


export default function DefaultLayout() {
    const { compareProductIds } = useGlobal()

    return (
        <>
            <header className="nav-bar shadow">
                <div className="container w-75 d-flex flex-column flex-md-row justify-content-between align-items-center p-3 gap-2">
                    <NavLink className="home-logo text-white text-decoration-none h1" to="/">
                        TeKno_logia
                    </NavLink>
                    <div className="d-flex align-items-center gap-3">
                        <NavLink to="/product-list/?category=Laptop" className="text-white text-decoration-none h6">Laptop</NavLink>
                        <NavLink to="/product-list/?category=Smartphone" className="text-white text-decoration-none h6">Smartphone</NavLink>
                        <NavLink to="/product-list/?category=Game" className="text-white text-decoration-none h6">Games</NavLink>
                        <NavLink className="text-white text-decoration-none h6 position-relative" to="/compare">
                            {compareProductIds.length > 0 ? <i className="bi bi-clipboard2-fill"></i> : <i className="bi bi-clipboard2"></i>}
                            {compareProductIds.length > 0 && (
                                <span className="badge bg-danger ms-1">{compareProductIds.length}</span>
                            )}
                        </NavLink>
                        <div id="wishlist-root" className="position-relative text-white text-decoration-none h6"></div>
                    </div>
                </div>
            </header>
            <Wishlist />
            <main>
                <Outlet />
            </main>
            <footer className="footer py-3 mt-5">
                <div className="container text-center">
                    <span className="text-white">
                        &copy; {new Date().getFullYear()} <span className="text-accent">TeKno_logia</span>. Tutti i diritti riservati.
                    </span>
                </div>
            </footer>


        </>
    )
}