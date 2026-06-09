import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

// Importamos las páginas
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import AdminRoute from './components/AdminRoute'
import AdminDashboard from './pages/admin/AdminDashboard'
import ProductForm from './pages/admin/ProductForm'
import AboutPage from './pages/AboutPage'
import InfoPage from './pages/InfoPage'
import ContactPage from './pages/ContactPage'
import OrdersPage from './pages/OrdersPage'
import AdminOrders from './pages/admin/AdminOrders'
import OrderSuccessPage from './pages/OrderSuccessPage'
import PersonalDataPage from './pages/PersonalDataPage'

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/catalogo" element={<CatalogPage />} />
                <Route path="/nosotros" element={<AboutPage />} />

                {/* Esta es la ruta dinámica ":id" es la variable */}
                <Route path="/producto/:id" element={<ProductDetailPage />} />
                <Route path="/carrito" element={<CartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registro" element={<RegisterPage />} />
                <Route path="/perfil" element={<ProfilePage />} />
                <Route path="/contacto" element={<ContactPage />} />
                <Route path="/envios" element={<InfoPage />} />
                <Route path="/devoluciones" element={<InfoPage />} />
                <Route path="/faq" element={<InfoPage />} />
                <Route path="/terminos" element={<InfoPage />} />
                <Route path="*" element={<div className="pt-32 text-center">Página no encontrada</div>} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/mis-pedidos" element={<OrdersPage />} />
                <Route path="/orden-completada" element={<OrderSuccessPage />} />
                <Route path="/datos-personales" element={<PersonalDataPage />} />
                <Route path="/admin/pedidos" element={
                    <AdminRoute>
                        <AdminOrders />
                    </AdminRoute>
                } />

                {/* --- RUTAS DE ADMINISTRACIÓN --- */}
                <Route path="/admin" element={
                    <AdminRoute>
                        <AdminDashboard />
                    </AdminRoute>
                } />

                <Route path="/admin/nuevo" element={
                    <AdminRoute>
                        <ProductForm />
                    </AdminRoute>
                } />

                <Route path="/admin/editar/:id" element={
                    <AdminRoute>
                        <ProductForm />
                    </AdminRoute>
                } />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App