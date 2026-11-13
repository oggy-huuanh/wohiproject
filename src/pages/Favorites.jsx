import { Link } from 'react-router-dom'
import MealGrid from '../components/MealGrid.jsx'
import useFavorites from '../hooks/useFavorites.js'

// Favorites screen: the meals the user saved.
// They come from the favourites context (saved in localStorage), so this
// page needs no API request and therefore no loading or error state.
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
          {/* Pressing "♥ Saved" on a card removes it. The context updates,
              this page re-renders, and the card disappears. */}
          <MealGrid meals={favorites} />
        </>
      )}
    </>
  )
}

export default Favorites
