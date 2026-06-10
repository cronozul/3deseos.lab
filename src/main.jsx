import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter as BrowserRouter } from 'react-router-dom'
import { LanguageProvider } from './i18n.jsx'
import { CartProvider } from './context/CartContext.jsx'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <CartProvider>
          {/* Skip-to-content: accesibilidad para teclado/lectores de pantalla */}
          <a href="#main-content" className="skip-to-content">
            Ir al contenido principal
          </a>
          <App />
        </CartProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
