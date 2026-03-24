// Esta página mostra todos os detalhes de uma refeição específica —
// a imagem, os ingredientes, a categoria, o país e as instruções de preparação

// O useState guarda os dados e o useEffect vai buscá-los quando a página abre
import { useState, useEffect } from 'react'
// O useParams deixa-me ler o id da refeição que está no URL
// O useNavigate uso para o botão Voltar funcionar
import { useParams, useNavigate } from 'react-router-dom'
// Função que vai buscar os detalhes de uma refeição pelo id à API
import { getMealById } from '../services/mealService'

function MealDetail() {
    // Vou buscar o id da refeição diretamente ao URL — ex: /meal/52772
    const { id } = useParams()
    // Aqui guardo os dados completos da refeição quando chegam da API
    const [meal, setMeal] = useState(null)
    // Enquanto os dados carregam mostro um spinner
    const [loading, setLoading] = useState(true)
    // Se algo correr mal guardo o erro aqui
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    // Sempre que o id no URL muda vou buscar os dados dessa refeição à API
    useEffect(() => {
        getMealById(id)
            .then(data => {
                // Se correu bem guardo os dados e escondo o spinner
                setMeal(data)
                setLoading(false)
            })
            .catch(() => {
                // Se algo falhou mostro o erro e escondo o spinner
                setError('Erro ao carregar os dados.')
                setLoading(false)
            })
    }, [id]) // O [id] significa que este efeito corre de novo se o id mudar

    // Mostro o spinner enquanto os dados ainda não chegaram
    if (loading) return <div className="container mt-5 text-center"><div className="spinner-border text-warning" /></div>
    // Se houve erro mostro a mensagem a vermelho
    if (error) return <div className="container mt-5 text-center text-danger">{error}</div>

    // A API guarda os ingredientes em campos separados — strIngredient1, strIngredient2, etc.
    // até ao strIngredient20. Faço um ciclo para juntar todos numa lista simples
    const ingredients = []
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`]
        const measure = meal[`strMeasure${i}`]
        // Só adiciono se o ingrediente não estiver vazio
        if (ingredient && ingredient.trim()) {
            ingredients.push(`${measure} ${ingredient}`)
        }
    }

    return (
        <div className="container mt-5">
            {/* O navigate(-1) volta à página anterior, seja ela a MealList ou a Search */}
            <button className="btn btn-secondary mb-4" onClick={() => navigate(-1)}>
                ← Voltar
            </button>
            <div className="row">
                <div className="col-md-5">
                    {/* Imagem da refeição */}
                    <img src={meal.strMealThumb} className="img-fluid rounded shadow" alt={meal.strMeal} />
                </div>
                <div className="col-md-7">
                    {/* Nome da refeição */}
                    <h2>{meal.strMeal}</h2>
                    <p>
                        {/* País de origem e categoria em badges */}
                        <span className="badge bg-warning text-dark">{meal.strArea}</span> &nbsp;
                        <span className="badge bg-secondary">{meal.strCategory}</span>
                    </p>
                    <h5 className="mt-3">🧂 Ingredientes</h5>
                    {/* Lista de ingredientes que construí no ciclo acima */}
                    <ul>
                        {ingredients.map((ing, index) => (
                            <li key={index}>{ing}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-12">
                    <h5>📋 Instruções</h5>
                    {/* O whiteSpace pre-line preserva as quebras de linha das instruções */}
                    <p style={{ whiteSpace: 'pre-line' }}>{meal.strInstructions}</p>
                </div>
            </div>
        </div>
    )
}

export default MealDetail