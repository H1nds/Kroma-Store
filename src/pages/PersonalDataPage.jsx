import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, User, Mail, Lock } from 'lucide-react'
import Swal from 'sweetalert2'

const PersonalDataPage = () => {
    const { user, updateProfileData } = useAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: user?.displayName || '',
        email: user?.email || '',
        password: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await updateProfileData(formData.name, formData.email, formData.password)
            Swal.fire('¡Éxito!', 'Datos actualizados correctamente.', 'success')
            navigate('/perfil')
        } catch (error) {
            Swal.fire('Error', error.message, 'error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#fdfdf1] pt-28 pb-12 px-4">
            <div className="max-w-xl mx-auto">
                <Link to="/perfil" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#EC5E27] mb-8">
                    <ArrowLeft size={16} /> Volver al perfil
                </Link>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <h1 className="text-2xl font-kroma-logo text-[#2b323f] mb-8">Datos Personales</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Nombre de Usuario</label>
                            <input className="w-full px-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:border-[#EC5E27]"
                                value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Tu nombre" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Correo Electrónico</label>
                            <input className="w-full px-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:border-[#EC5E27]"
                                value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Nueva Contraseña</label>
                            <input className="w-full px-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:border-[#EC5E27]"
                                value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} type="password" placeholder="••••••••" />
                        </div>
                        <button disabled={loading} className="w-full bg-[#2b323f] text-white py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#EC5E27] transition-all">
                            {loading ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default PersonalDataPage