import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createProduct, uploadProductImage } from '../../services/productService'
import { Upload, ArrowLeft, Loader, AlertTriangle, CheckCircle } from 'lucide-react'

const ProductForm = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // Estado del formulario
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        price: '',
        category: 'Hombre',
        description: '',
        isFeatured: false
    })

    const [imageFile, setImageFile] = useState(null)
    const [preview, setPreview] = useState(null)

    // Manejar inputs de texto
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    // --- VALIDACIÓN DE IMAGEN ESTRICTA ---
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (!file) return

        // 1. Crear previsualización temporal para medirla
        const objectUrl = URL.createObjectURL(file)
        const img = new Image()
        img.src = objectUrl

        img.onload = () => {
            // 2. Verificar medidas
            if (img.width !== 1080 || img.height !== 1350) {
                setError(`⚠️ Error de Medidas: La imagen mide ${img.width}x${img.height}px. DEBE ser 1080x1350px exactos.`)
                setImageFile(null)
                setPreview(null)
            } else {
                // 3. Si pasa, limpiamos error y guardamos
                setError('')
                setImageFile(file)
                setPreview(objectUrl)
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!imageFile) return setError("Debes subir una imagen válida (1080x1350).")

        setLoading(true)
        setError('')

        try {
            // 1. Subir imagen y obtener URL
            const imageUrl = await uploadProductImage(imageFile)

            // 2. Crear objeto final (convertimos precio a número)
            const newProduct = {
                ...formData,
                price: parseFloat(formData.price),
                image: imageUrl,
                createdAt: new Date()
            }

            // 3. Guardar en Firestore
            await createProduct(newProduct)

            // 4. Volver al panel
            navigate('/admin')

        } catch (err) {
            console.error(err)
            setError(err.message || "Error al crear el producto")
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-4">
            <div className="max-w-3xl mx-auto">

                <Link to="/admin" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#EC5E27] mb-6">
                    <ArrowLeft size={16} /> Volver al panel
                </Link>

                <h1 className="text-3xl font-kroma-logo text-[#2b323f] mb-8">Nuevo Producto</h1>

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-start gap-3">
                            <AlertTriangle className="shrink-0" />
                            <p className="font-medium">{error}</p>
                        </div>
                    )}

                    {/* Carga de Imagen */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                            Imagen del Producto <span className="text-[#EC5E27]">(Obligatorio 1080x1350)</span>
                        </label>

                        <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${preview ? 'border-[#EC5E27] bg-[#EC5E27]/5' : 'border-gray-200 hover:border-gray-300'}`}>
                            {preview ? (
                                <div className="relative inline-block">
                                    <img src={preview} alt="Preview" className="h-64 rounded-lg shadow-md mx-auto" />
                                    <button
                                        type="button"
                                        onClick={() => { setPreview(null); setImageFile(null) }}
                                        className="absolute -top-3 -right-3 bg-red-500 text-white p-1 rounded-full shadow-lg hover:bg-red-600"
                                    >
                                        ×
                                    </button>
                                    <div className="mt-2 text-[#EC5E27] text-sm font-bold flex items-center justify-center gap-1">
                                        <CheckCircle size={14} /> Medidas Correctas
                                    </div>
                                </div>
                            ) : (
                                <label className="cursor-pointer block">
                                    <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                                    <span className="text-gray-600 block">Haz clic para subir imagen</span>
                                    <span className="text-xs text-gray-400 block mt-1">Formato JPG/PNG - 1080x1350 px</span>
                                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                </label>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Nombre</label>
                            <input required name="name" value={formData.name} onChange={handleChange} placeholder="Ej: Dylan Blue" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#EC5E27]" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Marca</label>
                            <input required name="brand" value={formData.brand} onChange={handleChange} placeholder="Ej: Versace" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#EC5E27]" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Precio (S/)</label>
                            <input required type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} placeholder="0.00" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#EC5E27]" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Categoría</label>
                            <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#EC5E27]">
                                <option value="Hombre">Hombre</option>
                                <option value="Mujer">Mujer</option>
                                <option value="Unisex">Unisex</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Descripción</label>
                        <textarea required name="description" value={formData.description} onChange={handleChange} rows="4" placeholder="Detalles de la fragancia..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#EC5E27]"></textarea>
                    </div>

                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                        <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="w-5 h-5 accent-[#EC5E27]" />
                        <span className="font-bold text-[#2b323f]">Destacar en Portada</span>
                    </label>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 rounded-full font-bold uppercase tracking-widest text-white shadow-lg flex justify-center items-center gap-2 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#2b323f] hover:bg-[#EC5E27] transition-all'}`}
                    >
                        {loading ? <><Loader className="animate-spin" /> Guardando...</> : 'Publicar Producto'}
                    </button>

                </form>
            </div>
        </div>
    )
}

export default ProductForm