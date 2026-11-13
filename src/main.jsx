import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
// Bootstrap first, then our own CSS so we can override Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'
import FavoritesProvider from "./context/FavouritesProvider.jsx";

// HashRouter: GitHub Pages cannot serve normal routes on refresh
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
        <FavoritesProvider>
      <App />
        </FavoritesProvider>
    </HashRouter>
  </StrictMode>,
)
