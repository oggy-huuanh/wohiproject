import { Container } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom'
import AppNavbar from './components/AppNavbar.jsx'
import Home from './pages/Home.jsx'
import Pantry from './pages/Pantry.jsx'
import Browse from './pages/Browse.jsx'
import Favorites from './pages/Favorites.jsx'
import Recipe from './pages/Recipe.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    <>
      <AppNavbar />
      <main>
        <Container className="py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pantry" element={<Pantry />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/recipe/:id" element={<Recipe />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </main>
      <footer className="text-center text-muted small py-3">
        Recipes from{' '}
        <a href="https://www.themealdb.com" target="_blank" rel="noreferrer">
          TheMealDB
        </a>
      </footer>
    </>
  )
}

export default App
