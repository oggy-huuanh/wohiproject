import { Button } from 'react-bootstrap'
import useFavorites from '../hooks/useFavorites.js'

// Adds or removes one meal from the favourites
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
