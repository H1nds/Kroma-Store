import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'
import { Mail, Lock, User, AlertCircle } from 'lucide-react'
import KromaIcon from '../components/KromaIcon'

const RegisterPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [error, setError] = useState('')
    const { signup } = useAuth() // Usamos la función de registro
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirmPass) return setError('Las contraseñas no coinciden.')

        try {
            await signup(email, password)
            navigate('/')
        } catch (err) {
            setError('Error al registrarse. El correo podría estar en uso.')
        }
    }

    return (
        <div className="min-h-screen bg-[#fdfdf1] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
            >
                <div className="p-8">
                    <div className="text-center mb-6">
                        <Link to="/" className="inline-block mb-2"><KromaIcon className="w-10 h-10 text-[#EC5E27]" /></Link>
                        <h2 className="text-2xl font-kroma-logo text-[#2b323f]">Únete a Kroma</h2>
                    </div>

                    {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-4 flex gap-2"><AlertCircle size={16} />{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Correo</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#EC5E27]" required />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Contraseña</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#EC5E27]" required />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Confirmar Contraseña</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#EC5E27]" required />
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-[#EC5E27] text-white py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#d64e1c] transition-all shadow-lg mt-4">
                            Crear Cuenta
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        ¿Ya tienes cuenta? <Link to="/login" className="text-[#2b323f] font-bold hover:underline">Inicia Sesión</Link>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default RegisterPage