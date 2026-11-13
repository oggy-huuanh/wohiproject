import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
// Bootstrap first, then our own CSS so we can override Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'
import FavoritesProvider from "./context/FavouritesProvider.jsx";

// HashRouter keeps the route after the "#" (e.g. /pantry/#/recipe/52772).
// GitHub Pages only serves static files, so with normal URLs a page refresh
// would give a 404. With the hash, the server always serves index.html.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
        <FavoritesProvider>
      <App />
        </FavoritesProvider>
    </HashRouter>
  </StrictMode>,
)
