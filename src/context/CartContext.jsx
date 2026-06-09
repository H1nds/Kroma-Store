import { createContext, useState, useEffect, useContext } from 'react'

// 1. Creamos el Contexto
const CartContext = createContext()

// 2. Hook personalizado para usar el carrito fácil en cualquier lado
export const useCart = () => useContext(CartContext)

// 3. El Proveedor (La "Nube") que envolverá tu app
export const CartProvider = ({ children }) => {
    // Estado del carrito. Intentamos leer del localStorage primero.
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('kroma_cart')
        return savedCart ? JSON.parse(savedCart) : []
    })

    // Cada vez que el carrito cambie, lo guardamos en el navegador
    useEffect(() => {
        localStorage.setItem('kroma_cart', JSON.stringify(cart))
    }, [cart])

    // --- FUNCIÓN: AGREGAR AL CARRITO ---
    const addToCart = (product, quantity = 1) => {
        setCart(prevCart => {
            // ¿El producto ya está en el carrito?
            const existingItem = prevCart.find(item => item.id === product.id)

            if (existingItem) {
                // Si ya existe, solo aumentamos la cantidad
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            } else {
                // Si no existe, lo agregamos como nuevo
                return [...prevCart, { ...product, quantity }]
            }
        })
    }

    // --- FUNCIÓN: QUITAR DEL CARRITO ---
    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId))
    }

    // --- FUNCIÓN: ACTUALIZAR CANTIDAD (+ o -) ---
    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return // No permitir 0 o negativos
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        )
    }

    // --- FUNCIÓN: LIMPIAR TODO ---
    const clearCart = () => setCart([])


    // --- DATOS COMPUTADOS (Totales) ---
    // Calculamos cuántos items hay en total (para el puntito rojo del navbar)
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)

    // Calculamos el precio total en Soles
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            totalItems,
            totalPrice
        }}>
            {children}
        </CartContext.Provider>
    )
}