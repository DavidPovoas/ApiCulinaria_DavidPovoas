// Contexto do tema do site — controla o modo claro/escuro globalmente

// Importo funções do React necessárias para criar contextos e controlar estado
import { createContext, useContext, useState, useEffect } from 'react'

// Crio o contexto que vai ser partilhado por toda a aplicação
const ThemeContext = createContext()

// Provider que envolve toda a aplicação e disponibiliza o dark mode
export function ThemeProvider({ children }) {
    // Estado que guarda se o dark mode está ativo (true) ou não (false)
    const [darkMode, setDarkMode] = useState(false)

    // Função que alterna entre dark e light mode
    const toggleDarkMode = () => setDarkMode(prev => !prev)

    // Sempre que o darkMode muda, atualizo os atributos do documento
    useEffect(() => {
        // Define o tema do Bootstrap — "dark" ou "light"
        document.documentElement.setAttribute('data-bs-theme', darkMode ? 'dark' : 'light')
        // Altera a cor de fundo do body para combinar com o tema
        document.body.style.backgroundColor = darkMode ? '#212529' : '#ffffff'
    }, [darkMode]) // Este efeito corre sempre que darkMode mudar

    // Provider disponibiliza o estado e a função toggle para toda a aplicação
    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    )
}

// Hook personalizado para aceder facilmente ao contexto em qualquer componente
export function useTheme() {
    return useContext(ThemeContext)
}