// Este é um componente filho — é o cartão individual de cada refeição.
// É usado na MealList e na Search para mostrar as refeições em grelha.
// Recebe os dados de uma refeição via props e ao clicar abre o detalhe dessa refeição.

// Preciso do useNavigate para navegar para a página de detalhe quando clico no cartão
import { useNavigate } from 'react-router-dom'

// O meal é a prop que recebo com os dados da refeição — nome, imagem e id
function MealCard({ meal }) {
    const navigate = useNavigate()

    return (
        // Ao clicar em qualquer parte do cartão navego para o detalhe da refeição
        // usando o id único que a API me dá
        <div
            className="card h-100 shadow-sm"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/meal/${meal.idMeal}`)}
        >
            {/* Imagem da refeição que vem diretamente da API */}
            <img
                src={meal.strMealThumb}
                className="card-img-top"
                alt={meal.strMeal}
            />
            <div className="card-body text-center">
                {/* Nome da refeição */}
                <p className="card-text fw-bold">{meal.strMeal}</p>
            </div>
        </div>
    )
}

export default MealCard