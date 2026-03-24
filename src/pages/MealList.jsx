// Esta página mostra todas as refeições de um país específico.
// Chego aqui quando clico num país na página Areas.

// O useState guarda os dados e o useEffect vai buscá-los quando a página abre
import { useState, useEffect } from 'react'
// O useParams deixa-me ler o nome do país que está no URL
// O useNavigate uso para o botão Voltar funcionar
import { useParams, useNavigate } from 'react-router-dom'
// Função que vai buscar as refeições de um país à API
import { getMealsByArea } from '../services/mealService'
// O MealCard é o componente filho que representa cada refeição individualmente
import MealCard from '../components/MealCard'

function MealList() {
    // Vou buscar o nome do país diretamente ao URL — ex: /meals/Portuguese
    const { area } = useParams()
    // Aqui guardo a lista de refeições quando chegam da API
    const [meals, setMeals] = useState([])
    // Enquanto os dados carregam mostro um spinner
    const [loading, setLoading] = useState(true)
    // Se algo correr mal guardo o erro aqui
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    // Sempre que o país no URL muda vou buscar as refeições desse país à API
    useEffect(() => {
        getMealsByArea(area)
            .then(data => {
                // Se correu bem guardo as refeições e escondo o spinner
                setMeals(data)
                setLoading(false)
            })
            .catch(() => {
                // Se algo falhou mostro o erro e escondo o spinner
                setError('Erro ao carregar os dados.')
                setLoading(false)
            })
    }, [area]) // O [area] significa que este efeito corre de novo se o país mudar

    // Mostro o spinner enquanto os dados ainda não chegaram
    if (loading) return <div className="container mt-5 text-center"><div className="spinner-border text-warning" /></div>
    // Se houve erro mostro a mensagem a vermelho
    if (error) return <div className="container mt-5 text-center text-danger">{error}</div>

    return (
        <div className="container mt-5">
            {/* O botão Voltar leva-me de volta à lista de países */}
            <button className="btn btn-secondary mb-4" onClick={() => navigate('/areas')}>
                ← Voltar
            </button>
            {/* Título com o nome do país que estou a ver */}
            <h2 className="mb-4 text-center section-title">🍽️ {area}</h2>
            <div className="row">
                {/* Percorro a lista de refeições e crio um MealCard para cada uma.
                    Passo os dados da refeição via a prop meal para o componente filho */}
                {meals.map(meal => (
                    <div key={meal.idMeal} className="col-6 col-md-4 col-lg-3 mb-4">
                        <MealCard meal={meal} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MealList