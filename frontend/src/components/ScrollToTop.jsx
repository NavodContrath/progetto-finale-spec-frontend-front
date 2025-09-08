import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"

export default function ScrollToTop() {
    const { pathname } = useLocation()
    const topRef = useRef(null)

    useEffect(() => {
        topRef.current.scrollIntoView({ behavior: "smooth" })
    }, [pathname])

    return <div ref={topRef}></div>
}