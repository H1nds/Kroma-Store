import { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { createProduct, uploadProductImage, getProductById, updateProduct, updateHeroImage } from '../../services/productService'
import { Upload, ArrowLeft, Loader, AlertTriangle, Image as ImageIcon } from 'lucide-react'
import Swal from 'sweetalert2'

const ProductForm = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEditing = !!id

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // ESTADO PARA EL MODO PORTADA
    const [isHeroMode, setIsHeroMode] = useState(false)

    const [formData, setFormData] = useState({
        name: '', brand: '', price: '', category: 'Hombre', description: '', isFeatured: false
    })

    const [imageFile, setImageFile] = useState(null)
    const [preview, setPreview] = useState(null)

    useEffect(() => {
        if (isEditing) {
            const loadData = async () => {
                const product = await getProductById(id)
                if (product) {
                    setFormData({
                        name: product.name, brand: product.brand, price: product.price,
                        category: product.category, description: product.description, isFeatured: product.isFeatured || false
                    })
                    setPreview(product.image)
                }
            }
            loadData()
        }
    }, [id, isEditing])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    }

    // Toggle para cambiar a modo portada y resetear imagen
    const handleHeroModeToggle = () => {
        setIsHeroMode(!isHeroMode)
        setImageFile(null)
        setPreview(null)
        setError('')
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        const objectUrl = URL.createObjectURL(file)
        const img = new Image()
        img.src = objectUrl
        img.onload = () => {
            // Medidas fijas para ambos modos (1080x1350)
            if (img.width !== 1080 || img.height !== 1350) {
                setError(`⚠️ Error: La imagen mide ${img.width}x${img.height}px. DEBE ser 1080x1350px exactos.`)
                setImageFile(null)
            } else {
                setError('')
                setImageFile(file)
                setPreview(objectUrl)
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!isEditing && !imageFile) return setError("Debes subir una imagen válida.")

        setLoading(true)
        setError('')

        try {
            // SI ESTAMOS EN MODO PORTADA: Guardar directo a settings y salir
            if (isHeroMode) {
                const imageUrl = await uploadProductImage(imageFile)
                await updateHeroImage(imageUrl)
                Swal.fire({ title: 'Portada Actualizada', icon: 'success', toast: true, position: 'bottom-end', timer: 2000, showConfirmButton: false })
                navigate('/admin')
                return
            }

            // LÓGICA NORMAL DE PRODUCTOS
            let imageUrl = preview
            if (imageFile) {
                imageUrl = await uploadProductImage(imageFile)
            }

            const finalProduct = {
                ...formData,
                price: parseFloat(formData.price),
                image: imageUrl
            }

            if (isEditing) {
                await updateProduct(id, finalProduct)
                Swal.fire({ title: 'Actualizado', icon: 'success', toast: true, position: 'bottom-end', timer: 2000, showConfirmButton: false })
            } else {
                finalProduct.createdAt = new Date()
                await createProduct(finalProduct)
                Swal.fire({ title: 'Creado', icon: 'success', toast: true, position: 'bottom-end', timer: 2000, showConfirmButton: false })
            }

            navigate('/admin')

        } catch (err) {
            setError(err.message || "Error al guardar")
            setLoading(false)
        }
    }

    // Clases dinámicas para deshabilitar inputs
    const inputClass = `w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none transition-colors ${isHeroMode ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60' : 'bg-gray-50 focus:border-[#EC5E27]'}`

    return (
        <div className="min-h-screen bg-[#fdfdf1] pt-28 pb-12 px-4">
            <div className="max-w-3xl mx-auto">
                <Link to="/admin" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#EC5E27] mb-8 transition-colors">
                    <ArrowLeft size={16} /> Volver al panel
                </Link>

                <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
                    <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-6">
                        <h1 className="text-3xl font-kroma-logo text-[#2b323f]">
                            {isEditing ? 'Editar Producto' : 'Nuevo Registro'}
                        </h1>

                        {/* TOGGLE MODO PORTADA (Solo si NO está editando) */}
                        {!isEditing && (
                            <label className="flex items-center cursor-pointer p-3 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition">
                                <div className="relative">
                                    <input type="checkbox" className="sr-only" checked={isHeroMode} onChange={handleHeroModeToggle} />
                                    <div className={`block w-10 h-6 rounded-full transition ${isHeroMode ? 'bg-[#EC5E27]' : 'bg-gray-300'}`}></div>
                                    <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${isHeroMode ? 'transform translate-x-4' : ''}`}></div>
                                </div>
                                <div className="ml-3 text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <ImageIcon size={16} className={isHeroMode ? 'text-[#EC5E27]' : 'text-gray-400'} />
                                    Actualizar Portada
                                </div>
                            </label>
                        )}
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-3 border border-red-100">
                            <AlertTriangle size={20} /> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* IMAGEN */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-[#EC5E27] mb-2">
                                {isHeroMode ? 'IMAGEN DE PORTADA (OBLIGATORIO 1080X1350)' : 'IMAGEN DEL PRODUCTO (OBLIGATORIO 1080X1350)'}
                            </label>

                            <div className={`mt-2 flex justify-center rounded-xl border border-dashed border-gray-300 px-6 py-10 transition-colors hover:bg-gray-50 ${isHeroMode ? 'bg-orange-50/30 border-orange-200' : ''}`}>
                                <div className="text-center">
                                    {preview ? (
                                        <div className="relative inline-block">
                                            <img src={preview} alt="Vista previa" className="rounded-lg object-cover shadow-md h-64 w-48" />
                                            <button type="button" onClick={() => { setPreview(null); setImageFile(null); }} className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 hover:scale-110 transition-transform">
                                                <ArrowLeft size={16} className="rotate-45" />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <Upload className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                            <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                                                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-[#EC5E27] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#EC5E27] focus-within:ring-offset-2 hover:text-[#2b323f]">
                                                    <span>Haz clic para subir imagen</span>
                                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/png, image/jpeg, image/webp" onChange={handleImageChange} />
                                                </label>
                                            </div>
                                            <p className="text-xs leading-5 text-gray-400 mt-2">
                                                Formato JPG/PNG - 1080x1350 px
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* INPUTS DE PRODUCTO (Se deshabilitan en modo portada) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Nombre</label>
                                <input disabled={isHeroMode} required={!isHeroMode} type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass} placeholder="Ej: Dylan Blue" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Marca</label>
                                <input disabled={isHeroMode} required={!isHeroMode} type="text" name="brand" value={formData.brand} onChange={handleChange} className={inputClass} placeholder="Ej: Versace" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Precio (S/)</label>
                                <input disabled={isHeroMode} required={!isHeroMode} type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} className={inputClass} placeholder="0.00" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Categoría</label>
                                <select disabled={isHeroMode} name="category" value={formData.category} onChange={handleChange} className={inputClass}>
                                    <option value="Hombre">Hombre</option>
                                    <option value="Mujer">Mujer</option>
                                    <option value="Unisex">Unisex</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Descripción Corta</label>
                            <textarea disabled={isHeroMode} required={!isHeroMode} name="description" rows="3" value={formData.description} onChange={handleChange} className={inputClass} placeholder="Describe las notas de la fragancia..."></textarea>
                        </div>

                        <div className="flex items-center">
                            <input disabled={isHeroMode} type="checkbox" name="isFeatured" id="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="h-4 w-4 text-[#EC5E27] focus:ring-[#EC5E27] border-gray-300 rounded cursor-pointer disabled:opacity-50" />
                            <label htmlFor="isFeatured" className={`ml-2 block text-sm font-bold text-gray-700 ${isHeroMode ? 'opacity-50' : 'cursor-pointer'}`}>
                                Destacar en Favoritos
                            </label>
                        </div>

                        {/* BOTÓN SUBMIT */}
                        <div className="pt-4 border-t border-gray-100">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full text-white py-4 rounded-full font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-lg 
                                ${loading ? 'bg-gray-400 cursor-not-allowed' : isHeroMode ? 'bg-[#EC5E27] hover:bg-orange-700' : 'bg-[#2b323f] hover:bg-gray-800'}`}
                            >
                                {loading ? <Loader className="animate-spin" size={20} /> : isHeroMode ? 'Actualizar Portada' : isEditing ? 'Actualizar Producto' : 'Publicar Producto'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProductForm