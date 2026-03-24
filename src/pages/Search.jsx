// Esta página permite pesquisar refeições por país e/ou categoria.
// Posso filtrar só por país, só por categoria, ou pelos dois ao mesmo tempo.

// O useState guarda os dados e o useEffect vai buscar os países e categorias quando a página abre
import { useState, useEffect } from 'react'
// Importo as funções necessárias para ir buscar países, categorias e refeições à API
import { getAreas, getCategories, getMealsByArea, getMealsByCategory } from '../services/mealService'
// O MealCard é o componente filho que representa cada refeição individualmente
import MealCard from '../components/MealCard'

function Search() {
    // Lista de países para preencher o select
    const [areas, setAreas] = useState([])
    // Lista de categorias para preencher o select
    const [categories, setCategories] = useState([])
    // País que o utilizador selecionou — começa vazio
    const [selectedArea, setSelectedArea] = useState('')
    // Categoria que o utilizador selecionou — começa vazia
    const [selectedCategory, setSelectedCategory] = useState('')
    // Lista de refeições que correspondem à pesquisa
    const [meals, setMeals] = useState([])
    // Controla o spinner que aparece enquanto a pesquisa está a correr
    const [loading, setLoading] = useState(false)
    // Fica true depois da primeira pesquisa para poder mostrar a mensagem de "sem resultados"
    const [searched, setSearched] = useState(false)

    // Quando a página abre vou buscar os países e as categorias para preencher os selects
    useEffect(() => {
        getAreas().then(setAreas)
        getCategories().then(setCategories)
    }, [])

    // Esta função corre quando clico no botão Pesquisar
    const handleSearch = async () => {
        // Se não tiver nada selecionado não faz nada
        if (!selectedArea && !selectedCategory) return
        setLoading(true)
        setSearched(true)

        try {
            let results = []

            if (selectedArea && selectedCategory) {
                // Se tiver país E categoria selecionados tenho de cruzar os resultados.
                // Vou buscar as refeições dos dois e fico só com as que aparecem nos dois
                const byArea = await getMealsByArea(selectedArea)
                const byCategory = await getMealsByCategory(selectedCategory)
                // Crio um Set com os ids das refeições da categoria para comparar rapidamente
                const categoryIds = new Set(byCategory.map(m => m.idMeal))
                // Fico só com as refeições do país que também estão na categoria
                results = byArea.filter(m => categoryIds.has(m.idMeal))
            } else if (selectedArea) {
                // Se só tiver país selecionado vou buscar as refeições desse país
                results = await getMealsByArea(selectedArea)
            } else {
                // Se só tiver categoria selecionada vou buscar as refeições dessa categoria
                results = await getMealsByCategory(selectedCategory)
            }

            setMeals(results)
        } catch {
            // Se algo correr mal fico com a lista vazia
            setMeals([])
        }

        setLoading(false)
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center section-title">🔍 Pesquisar Refeições</h2>

            <div className="row justify-content-center mb-4 g-3">
                {/* Select para escolher o país */}
                <div className="col-12 col-md-4">
                    <select
                        className="form-select"
                        value={selectedArea}
                        // Atualizo o estado sempre que o utilizador muda a seleção
                        onChange={e => setSelectedArea(e.target.value)}
                    >
                        <option value="">🌍 Todos os países</option>
                        {areas.map(area => (
                            <option key={area.strArea} value={area.strArea}>
                                {area.strArea}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Select para escolher a categoria */}
                <div className="col-12 col-md-4">
                    <select
                        className="form-select"
                        value={selectedCategory}
                        // Atualizo o estado sempre que o utilizador muda a seleção
                        onChange={e => setSelectedCategory(e.target.value)}
                    >
                        <option value="">🍽️ Todas as categorias</option>
                        {categories.map(cat => (
                            <option key={cat.strCategory} value={cat.strCategory}>
                                {cat.strCategory}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-12 col-md-2">
                    {/* O botão fica desativado se não tiver nada selecionado */}
                    <button
                        className="btn btn-warning w-100 fw-bold"
                        onClick={handleSearch}
                        disabled={!selectedArea && !selectedCategory}
                    >
                        🔍 Pesquisar
                    </button>
                </div>
            </div>

            {/* Mostro o spinner enquanto a pesquisa está a correr */}
            {loading && (
                <div className="text-center mt-4">
                    <div className="spinner-border text-warning" />
                </div>
            )}

            {/* Só mostro esta mensagem se já pesquisei e não há resultados */}
            {!loading && searched && meals.length === 0 && (
                <div className="text-center text-danger mt-4">
                    Nenhuma refeição encontrada para esta combinação.
                </div>
            )}

            {/* Grelha com os resultados da pesquisa usando o componente MealCard */}
            <div className="row">
                {meals.map(meal => (
                    <div key={meal.idMeal} className="col-6 col-md-4 col-lg-3 mb-4">
                        <MealCard meal={meal} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Search