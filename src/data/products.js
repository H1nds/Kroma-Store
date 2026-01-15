// Importamos las imágenes (usaremos las mismas 4 por ahora para no complicarnos, 
// luego tú subes las fotos reales de cada uno)
import p1 from '../assets/p1.jpg'
import p2 from '../assets/p2.jpg'
import p3 from '../assets/p3.jpg'
import p4 from '../assets/p4.jpg'

export const products = [
    {
        id: 1,
        name: "Dylan Blue Pour Homme",
        brand: "Versace",
        price: 420.00, // Precio en Soles
        category: "Hombre",
        image: p1,
        isFeatured: true
    },
    {
        id: 2,
        name: "Libre Eau de Parfum",
        brand: "Yves Saint Laurent",
        price: 580.90,
        category: "Mujer",
        image: p2,
        isFeatured: true
    },
    {
        id: 3,
        name: "Acqua di Gio Profondo",
        brand: "Giorgio Armani",
        price: 495.00,
        category: "Hombre",
        image: p3,
        isFeatured: true
    },
    {
        id: 4,
        name: "Good Girl Supreme",
        brand: "Carolina Herrera",
        price: 610.00,
        category: "Mujer",
        image: p4,
        isFeatured: true
    },
    {
        id: 5,
        name: "Sauvage Elixir",
        brand: "Dior",
        price: 720.00,
        category: "Hombre",
        image: p1, // Repetimos imagen por falta de assets
        isFeatured: false
    },
    {
        id: 6,
        name: "La Vie Est Belle",
        brand: "Lancôme",
        price: 450.00,
        category: "Mujer",
        image: p2,
        isFeatured: false
    },
    {
        id: 7,
        name: "Bleu de Chanel",
        brand: "Chanel",
        price: 680.00,
        category: "Hombre",
        image: p3,
        isFeatured: false
    },
    {
        id: 8,
        name: "J'adore",
        brand: "Dior",
        price: 590.00,
        category: "Mujer",
        image: p4,
        isFeatured: false
    }
];