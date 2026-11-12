import { Container } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom'
import AppNavbar from './components/AppNavbar.jsx'
import Home from './pages/Home.jsx'
import Pantry from './pages/Pantry.jsx'
import Browse from './pages/Browse.jsx'
import Favorites from './pages/Favorites.jsx'

function App() {
  return (
    <>
      <AppNavbar />
      <main>
        <Container className="py-4">
          {/* Each Route maps a URL path to a page component */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pantry" element={<Pantry />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/favorites" element={<Favorites />} />
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
