import { Button } from 'react-bootstrap'
import useFavorites from '../hooks/useFavorites.js'

// Button that adds one meal for the favourites, or removes it again.
// - meal: the meal object (needs idMeal, strMeal, strMealThumb)
// - size: optional, "sm" for the small buttons on the cards
function FavoriteButton({ meal, size }) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const saved = isFavorite(meal.idMeal)
    return <Button
        variant = { saved ? 'danger' : 'outline-danger' }
        size={size}
        aria-pressed={saved}
        aria-label={`Save ${meal.strMeal}`}
        onClick={() => toggleFavorite(meal)}>
        {saved ? '♥ Saved' : '♡ Save'}
    </Button>
}

export default FavoriteButton
