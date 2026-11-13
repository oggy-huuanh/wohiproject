import { Link } from 'react-router-dom'
import MealGrid from '../components/MealGrid.jsx'
import useFavorites from '../hooks/useFavorites.js'

// Favorites screen: meals saved in the favourites context (localStorage)
function Favorites() {
  const { favorites } = useFavorites()

  return (
    <>
      <h1 className="h2">Your favourites</h1>

      {favorites.length === 0 ? (
        <p>
          You have not saved any recipes yet. Press "♡ Save" on a recipe to
          keep it here. <Link to="/browse">Browse recipes</Link> or{' '}
          <Link to="/pantry">search by your ingredients</Link>.
        </p>
      ) : (
        <>
          <p className="text-muted">
            {favorites.length} saved{' '}
            {favorites.length === 1 ? 'recipe' : 'recipes'}
          </p>
          <MealGrid meals={favorites} />
        </>
      )}
    </>
  )
}

export default Favorites
