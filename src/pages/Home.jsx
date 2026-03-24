// Esta é a página inicial do site, é a primeira coisa que o utilizador vê.
// Tem o título, a imagem do ratatouille e um botão para ir explorar os países

// O Link é como um <a> mas do React, não recarrega a página quando clico
import { Link } from 'react-router-dom'
// Importo a imagem do ratatouille que está na pasta assets
import remy from '../assets/ratatouille_movie.png'

function Home() {
    return (
        <div className="container text-center mt-5">
            {/* Título principal da página */}
            <h1 className="display-4 hero-title">🌍 Bem-vindo ao World Meals!</h1>
            <p className="lead mt-3">Explora e prepara-te para descobrir as maravilhas gastronômicas do mundo!</p>

            {/* Esta div é só a moldura com gradiente à volta da imagem do Remy */}
            <div style={{
                display: 'inline-block',
                padding: '8px',
                // Gradiente de amarelo para vermelho, as cores principais do site
                background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                borderRadius: '20px',
                // Sombra amarelada por baixo para dar profundidade
                boxShadow: '0 8px 25px rgba(245, 158, 11, 0.4)'
            }}>
                <img
                    src={remy}
                    alt="Remy - World Meals"
                    style={{
                        maxHeight: '300px',
                        // O contain garante que a imagem não fica cortada
                        objectFit: 'contain',
                        borderRadius: '14px',
                        display: 'block'
                    }}
                />
            </div>

            <br />
            {/* Botão que leva o utilizador para a página dos países */}
            <Link to="/areas" className="btn btn-warning btn-lg mt-3">
                🍴 Explorar Países
            </Link>
        </div>
    )
}

export default Home