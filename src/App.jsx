// Este é o ficheiro principal, é aqui que junto tudo —
// as páginas, as rotas, o tema e a estrutura base do site

// Preciso disto para conseguir navegar entre páginas sem recarregar o site
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// O ThemeProvider é o que deixa o dark mode funcionar em todo o lado
import { ThemeProvider } from './ThemeContext'

// A Navbar e o Footer aparecem em todas as páginas por isso importo-os aqui
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Estas são todas as páginas do site
import Home from './pages/Home'
import Areas from './pages/Areas'
import MealList from './pages/MealList'
import MealDetail from './pages/MealDetail'
import Search from './pages/Search'

function App() {
    return (
        // Envolvo tudo no ThemeProvider para o dark mode funcionar em qualquer página
        <ThemeProvider>

            {/* O BrowserRouter é o que permite ao React saber em que página estou */}
            <BrowserRouter>

                {/* Este div garante que o footer fica sempre no fundo mesmo quando
                    a página tem pouco conteúdo */}
                <div className="d-flex flex-column min-vh-100">

                    {/* A Navbar fica sempre no topo */}
                    <Navbar />

                    {/* O main cresce para preencher o espaço entre a navbar e o footer */}
                    <main className="flex-grow-1">

                        {/* Aqui defino para onde cada caminho do URL me leva */}
                        <Routes>
                            {/* Página inicial */}
                            <Route path="/" element={<Home />} />

                            {/* Lista de todos os países */}
                            <Route path="/areas" element={<Areas />} />

                            {/* Refeições de um país — o :area muda conforme o país que escolhi */}
                            <Route path="/meals/:area" element={<MealList />} />

                            {/* Detalhe de uma refeição — o :id é o identificador único da refeição na API */}
                            <Route path="/meal/:id" element={<MealDetail />} />

                            {/* Página de pesquisa por país e categoria */}
                            <Route path="/search" element={<Search />} />
                        </Routes>
                    </main>

                    {/* O Footer fica sempre no fundo */}
                    <Footer />
                </div>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App