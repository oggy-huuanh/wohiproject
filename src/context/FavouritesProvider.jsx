import { useEffect, useState } from 'react'
import { FavoritesContext } from './favoritesContext.js'

const STORAGE_KEY = 'pantry-favorites'

// Reads the saved favourites when the app starts
function loadFavorites() {
    const favourites = localStorage.getItem(STORAGE_KEY)
    if (favourites == null){
        return [];
    }
    else{
        try{
            return JSON.parse(favourites)
        }
        catch{
            return [];
        }
    }
}

function FavoritesProvider({ children }) {
    const [favorites, setFavourites] = useState(loadFavorites);
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }, [favorites]);
    function isFavorite(id) {
        return favorites.some(meal => meal.idMeal === id);
    }
    function toggleFavorite(meal) {
        if (isFavorite(meal.idMeal)) {
            setFavourites(favorites.filter(fav => fav.idMeal !== meal.idMeal));
        }
        else {
            setFavourites([...favorites, { idMeal: meal.idMeal, strMeal: meal.strMeal, strMealThumb: meal.strMealThumb }]);
        }
    }
    return (
        <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    )
}

export default FavoritesProvider