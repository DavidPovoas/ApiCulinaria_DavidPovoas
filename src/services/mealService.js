// Este ficheiro centraliza todas as chamadas à API TheMealDB.
// Em vez de fazer fetch em cada página, tenho tudo organizado aqui
// e cada página importa só o que precisa.

// URL base da API — todas as chamadas começam por aqui
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

// Vai buscar a lista de todos os países disponíveis na API
// Uso isto na página Areas e nos filtros da pesquisa
export const getAreas = async () => {
    const res = await fetch(`${BASE_URL}/list.php?a=list`)
    const data = await res.json()
    return data.meals
}

// Vai buscar todas as refeições de um país específico
// O area é o nome do país — ex: Portuguese, Italian, etc.
export const getMealsByArea = async (area) => {
    const res = await fetch(`${BASE_URL}/filter.php?a=${area}`)
    const data = await res.json()
    return data.meals
}

// Vai buscar todos os detalhes de uma refeição pelo seu id único
// Devolve apenas o primeiro elemento porque a API devolve sempre um array com um objeto
export const getMealById = async (id) => {
    const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`)
    const data = await res.json()
    return data.meals[0]
}

// Pesquisa refeições pelo nome — uso isto na página de pesquisa
// O query é o texto que o utilizador escreveu
export const searchMeals = async (query) => {
    const res = await fetch(`${BASE_URL}/search.php?s=${query}`)
    const data = await res.json()
    return data.meals
}

// Vai buscar a lista de todas as categorias disponíveis na API
// Ex: Beef, Chicken, Dessert, Seafood, etc.
export async function getCategories() {
    const res = await fetch(`${BASE_URL}/list.php?c=list`)
    // Se a resposta não for ok lanço um erro para ser apanhado no catch da página
    if (!res.ok) throw new Error('Erro ao buscar categorias')
    const data = await res.json()
    return data.meals
}

// Vai buscar todas as refeições de uma categoria específica
// O || [] garante que se não houver resultados devolvo um array vazio em vez de null
export async function getMealsByCategory(category) {
    const res = await fetch(`${BASE_URL}/filter.php?c=${category}`)
    // Se a resposta não for ok lanço um erro para ser apanhado no catch da página
    if (!res.ok) throw new Error('Erro ao buscar por categoria')
    const data = await res.json()
    return data.meals || []
}