// Esta página mostra todos os países disponíveis na API.
// Quando clico num país vou para a página com as refeições desse país.

// O useState serve para guardar os dados e o useEffect para ir buscar os dados quando a página carrega
import { useState, useEffect } from 'react'
// O useNavigate é o que me deixa navegar para outra página quando clico num botão
import { useNavigate } from 'react-router-dom'
// Função que vai buscar a lista de países à API
import { getAreas } from '../services/mealService'

// Este objeto associa cada país à sua bandeira emoji.
// Se um país não tiver bandeira aqui definida, aparece um globo por defeito
const areaFlags = {
    American: '🇺🇸', British: '🇬🇧', Canadian: '🇨🇦', Chinese: '🇨🇳',
    Croatian: '🇭🇷', Dutch: '🇳🇱', Egyptian: '🇪🇬', Filipino: '🇵🇭',
    French: '🇫🇷', Greek: '🇬🇷', Indian: '🇮🇳', Irish: '🇮🇪',
    Italian: '🇮🇹', Jamaican: '🇯🇲', Japanese: '🇯🇵', Kenyan: '🇰🇪',
    Malaysian: '🇲🇾', Mexican: '🇲🇽', Moroccan: '🇲🇦', Norwegian: '🇳🇴',
    Polish: '🇵🇱', Portuguese: '🇵🇹', Russian: '🇷🇺', 'Saudi Arabian': '🇸🇦',
    Slovakian: '🇸🇰', Spanish: '🇪🇸', Syrian: '🇸🇾', Thai: '🇹🇭',
    Tunisian: '🇹🇳', Turkish: '🇹🇷', Ukrainian: '🇺🇦', Uruguayan: '🇺🇾',
    Venezulan: '🇻🇪', Vietnamese: '🇻🇳', Algerian: '🇩🇿', Argentinian: '🇦🇷',
    Australian: '🇦🇺'
}

function Areas() {
    // Aqui guardo a lista de países que vem da API
    const [areas, setAreas] = useState([])
    // Enquanto os dados estão a ser carregados, o loading fica true e mostro um spinner
    const [loading, setLoading] = useState(true)
    // Se algo correr mal guardo a mensagem de erro aqui
    const [error, setError] = useState(null)
    // O navigate é o que uso para mudar de página quando clico num país
    const navigate = useNavigate()

    // Este useEffect corre uma vez quando a página abre e vai buscar os países à API
    useEffect(() => {
        getAreas()
            .then(data => {
                // Se correu bem guardo os países e desativo o spinner
                setAreas(data)
                setLoading(false)
            })
            .catch(() => {
                // Se algo falhou mostro a mensagem de erro e desativo o spinner
                setError('Erro ao carregar os dados.')
                setLoading(false)
            })
    }, []) // O [] significa que só corre uma vez, quando o componente é montado

    // Enquanto os dados carregam mostro um spinner no centro da página
    if (loading) return <div className="container mt-5 text-center"><div className="spinner-border text-warning" /></div>
    // Se houve erro mostro a mensagem a vermelho
    if (error) return <div className="container mt-5 text-center text-danger">{error}</div>

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center section-title">🌍 Escolhe um País</h2>
            <div className="row">
                {/* Percorro a lista de países e crio um botão para cada um */}
                {areas.map(area => (
                    <div key={area.strArea} className="col-6 col-md-4 col-lg-3 mb-3">
                        <button
                            className="btn w-100 fw-semibold"
                            style={{
                                backgroundColor: '#f59e0b',
                                color: '#1a1a1a',
                                border: 'none',
                                borderRadius: '10px',
                                padding: '10px',
                                fontSize: '0.95rem',
                                transition: 'transform 0.2s, background-color 0.2s'
                            }}
                            // Quando passo o rato por cima o botão fica vermelho
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#ef4444'}
                            // Quando tiro o rato volta ao amarelo
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#f59e0b'}
                            // Quando clico navego para a página das refeições desse país
                            onClick={() => navigate(`/meals/${area.strArea}`)}
                        >
                            {/* Mostro a bandeira do país ou um globo se não tiver */}
                            {areaFlags[area.strArea] || '🌍'} {area.strArea}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Areas