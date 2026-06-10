import { db, storage } from '../firebase/config'
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { getDoc, setDoc } from 'firebase/firestore'

const COLLECTION_NAME = 'products'

// 1. Obtener todos los productos
export const getAllProducts = async () => {
    const snapshot = await getDocs(collection(db, COLLECTION_NAME))
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

// 2. Subir imagen (Con validación de tamaño integrada)
export const uploadProductImage = async (file) => {
    // Validación estricta de dimensiones antes de subir
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = URL.createObjectURL(file)

        img.onload = async () => {
            const width = img.naturalWidth
            const height = img.naturalHeight

            // LA REGLA DE ORO: 1080x1350
            if (width !== 1080 || height !== 1350) {
                reject(new Error(`Dimensiones incorrectas. Se requiere 1080x1350px. Tu imagen es ${width}x${height}px.`))
                return
            }

            // Si pasa la validación, subimos a Firebase Storage
            try {
                const storageRef = ref(storage, `products/${Date.now()}_${file.name}`)
                const snapshot = await uploadBytes(storageRef, file)
                const downloadURL = await getDownloadURL(snapshot.ref)
                resolve(downloadURL)
            } catch (error) {
                reject(error)
            }
        }

        img.onerror = () => reject(new Error("El archivo no es una imagen válida."))
    })
}

// 3. Crear producto en Base de Datos
export const createProduct = async (productData) => {
    return await addDoc(collection(db, COLLECTION_NAME), productData)
}

// 4. Borrar producto
export const deleteProduct = async (productId, imageUrl) => {
    // Primero borramos el doc
    await deleteDoc(doc(db, COLLECTION_NAME, productId))

    // Opcional: Borrar la imagen del Storage para no ocupar espacio basura
    // (Requiere lógica para extraer la ruta del URL, lo podemos dejar simple por ahora)
}

// 5. Obtener un solo producto por ID (Para la página de detalle)
export const getProductById = async (productId) => {
    // Asegúrate de que 'db' esté importado arriba
    const docRef = doc(db, 'products', productId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() }
    } else {
        // Si no existe, devolvemos null y la página mostrará "No encontrado"
        return null
    }
}

// 6. Actualizar un producto existente
export const updateProduct = async (productId, updatedData) => {
    const productRef = doc(db, COLLECTION_NAME, productId)
    await updateDoc(productRef, updatedData)
}

// 7. Guardar la imagen de Portada (Hero)
export const updateHeroImage = async (imageUrl) => {
    const heroRef = doc(db, 'settings', 'hero')
    await setDoc(heroRef, { imageUrl })
}

// 8. Obtener la imagen de Portada
export const getHeroImage = async () => {
    const heroRef = doc(db, 'settings', 'hero')
    const docSnap = await getDoc(heroRef)
    return docSnap.exists() ? docSnap.data().imageUrl : null
}