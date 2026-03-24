// O Footer aparece no fundo de todas as páginas.
// Muda de cor consoante o modo escuro está ativo ou não

// Preciso do useTheme para saber se o dark mode está ligado
import { useTheme } from '../ThemeContext'

function Footer() {
    // Vou buscar o valor do darkMode para saber que cor usar no fundo
    const { darkMode } = useTheme()

    return (
        <footer
            className="text-white text-center py-3 mt-auto"
            // Se o dark mode estiver ativo uso um cinzento mais claro para criar contraste
            // com o fundo escuro da página, senão uso o cinzento escuro normal
            style={{ backgroundColor: darkMode ? '#495057' : '#212529' }}
        >
            <div className="container">
                {/* Link para o site da API que estou a usar */}
                <p className="mb-0">🍽️ World Meals — Powered by <a href="https://www.themealdb.com" target="_blank" className="text-warning">TheMealDB</a></p>
                {/* Créditos */}
                <p className="mb-0 mt-1 text-secondary small">Feito por David Póvoas</p>
            </div>
        </footer>
    )
}

export default Footer