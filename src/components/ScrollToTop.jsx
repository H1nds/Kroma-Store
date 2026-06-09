import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
    // useLocation nos dice en qué ruta de la página estamos (ej: '/catalogo')
    const { pathname } = useLocation()

    useEffect(() => {
        // Cada vez que 'pathname' cambie, le decimos a la ventana que suba al inicio suavemente
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant' // Usamos 'instant' para que no se vea el barrido al cambiar de página
        })
    }, [pathname])

    return null // Este componente es invisible, no renderiza nada en la pantalla
}

export default ScrollToTop