// A Navbar aparece no topo de todas as páginas.
// Tem os links de navegação e o botão para alternar o modo escuro.
// A cor de fundo muda consoante o dark mode está ativo ou não.

// O Link é como um <a> mas do React, não recarrega a página quando clico
import { Link } from 'react-router-dom'
// Preciso do useTheme para saber se o dark mode está ativo e para o conseguir ligar/desligar
import { useTheme } from '../ThemeContext'

function Navbar() {
    // O darkMode diz-me se o modo escuro está ativo
    // O toggleDarkMode é a função que liga e desliga o modo escuro
    const { darkMode, toggleDarkMode } = useTheme()

    return (
        <nav
            className="navbar navbar-expand-lg navbar-dark"
            // Se o dark mode estiver ativo uso um cinzento mais claro para criar contraste
            // com o fundo escuro da página, senão uso o cinzento escuro normal
            style={{ backgroundColor: darkMode ? '#495057' : '#212529' }}
        >
            <div className="container">
                {/* O logótipo que ao clicar leva sempre para a página inicial */}
                <Link className="navbar-brand fw-bold" to="/">🍽️ World Meals</Link>

                {/* Este botão só aparece em mobile e serve para abrir/fechar o menu */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Este div colapsa em mobile e expande em desktop */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    {/* O ms-auto empurra os links para a direita */}
                    <ul className="navbar-nav ms-auto align-items-center gap-2">
                        <li className="nav-item">
                            {/* Link para a página inicial */}
                            <Link className="nav-link" to="/">Início</Link>
                        </li>
                        <li className="nav-item">
                            {/* Link para a lista de países */}
                            <Link className="nav-link" to="/areas">Países</Link>
                        </li>
                        <li className="nav-item">
                            {/* Link para a página de pesquisa */}
                            <Link className="nav-link" to="/search">🔍 Pesquisa</Link>
                        </li>
                        <li className="nav-item">
                            {/* Botão que liga e desliga o dark mode.
                                O texto muda consoante o estado atual */}
                            <button
                                className="btn btn-outline-light btn-sm"
                                onClick={toggleDarkMode}
                            >
                                {darkMode ? '☀️ Light' : '🌙 Dark'}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar