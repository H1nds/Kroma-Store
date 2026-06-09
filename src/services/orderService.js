import { db } from '../firebase/config'
import { collection, addDoc, getDocs, query, where, updateDoc, deleteDoc, doc, orderBy } from 'firebase/firestore'

const COLLECTION_NAME = 'orders'

// 1. Crear un pedido nuevo
export const createOrder = async (orderData) => {
    return await addDoc(collection(db, COLLECTION_NAME), orderData)
}

// 2. Obtener pedidos de un usuario específico
export const getUserOrders = async (email) => {
    const q = query(collection(db, COLLECTION_NAME), where("userEmail", "==", email))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

// 3. Obtener TODOS los pedidos (Para el Admin)
export const getAllOrders = async () => {
    const snapshot = await getDocs(collection(db, COLLECTION_NAME))
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

// 4. Actualizar el estado del pedido
export const updateOrderStatus = async (orderId, newStatus) => {
    const orderRef = doc(db, COLLECTION_NAME, orderId)
    await updateDoc(orderRef, { status: newStatus })
}

// 5. Eliminar pedido (Solo para estados permitidos)
export const deleteOrder = async (orderId) => {
    await deleteDoc(doc(db, COLLECTION_NAME, orderId))
}