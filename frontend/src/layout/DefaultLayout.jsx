import { NavLink, Outlet } from "react-router-dom";


export default function DefaultLayout() {
    return (
        <>
            <header className="nav-bar bg-primary shadow">
                <div className="container d-flex justify-content-between align-items-center p-3">
                    <NavLink className="home-logo text-white text-decoration-none h1" to="/"><i className="bi bi-list-ul">Tecno logia</i></NavLink>
                </div>

            </header>

            <main>
                <Outlet />
            </main>
            <footer className="nav-bar bg-primary shadow">
            </footer>

        </>
    )
}