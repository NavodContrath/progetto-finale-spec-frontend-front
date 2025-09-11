import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"

export default function ScrollToTop() {
    const { pathname } = useLocation()
    //creo nuovo riferimento
    const topRef = useRef(null)

    useEffect(() => {
        topRef.current.scrollIntoView({ behavior: "smooth" })
    }, [pathname])

    //collego elemento dom tramite la prop di riferimento
    return <div ref={topRef}></div>
}