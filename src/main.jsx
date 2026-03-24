// Este é o ponto de entrada da aplicação.
// É aqui que o React liga o App ao HTML (ao div com id "root").

// O StrictMode serve para ajudar a detetar problemas no código durante o desenvolvimento
import { StrictMode } from 'react'
// Função que cria a root da aplicação React
import { createRoot } from 'react-dom/client'

// Importo o Bootstrap para usar estilos prontos
import 'bootstrap/dist/css/bootstrap.min.css'
// Estilos globais
import './index.css'
// Componente principal da aplicação
import App from './App.jsx'
// Estilos específicos da App
import './App.css'

// Aqui renderizo a aplicação dentro do elemento com id "root" no HTML
createRoot(document.getElementById('root')).render(
    <StrictMode>
        {/* O App é o componente principal que contém todo o site */}
        <App />
    </StrictMode>,
)