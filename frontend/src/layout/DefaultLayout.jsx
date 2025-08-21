import { NavLink, Outlet } from "react-router-dom";
import Wishlist from "../components/Wishlist";


export default function DefaultLayout() {

    return (
        <>
            <header
                className="nav-bar shadow">
                <div className="container d-flex justify-content-between align-items-center p-3">
                    <NavLink className="home-logo text-accent text-decoration-none h1" to="/">Tecno logia</NavLink>
                    <div className="d-flex ">
                        <NavLink className=" text-white text-decoration-none h6 me-3" to="/compare">Comparatore</NavLink>
                        <div id="wishlist-root" className="position-relative text-white text-decoration-none h6"></div>
                    </div>

                </div>
            </header>
            <Wishlist />
            <main>
                <Outlet />
            </main>
            <footer className="nav-bar bg-primary shadow">
            </footer>

        </>
    )
}