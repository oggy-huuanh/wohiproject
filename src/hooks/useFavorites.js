import { useContext } from 'react'
import { FavoritesContext } from '../context/favoritesContext.js'

// Small helper so components can write useFavorites()
// instead of useContext(FavoritesContext) every time
function useFavorites() {
    // TODO 6: read the value from FavoritesContext with useContext.
    const val = useContext(FavoritesContext)

    // TODO 7: if the value is null, the component is not inside
    //         <FavoritesProvider>. Throw an Error with a clear message
    //         so the mistake is easy to spot.
    if (val == null){
        throw new Error('useFavorites must be used within a FavoritesProvider')
    }
    else{
        return val;
    }

    // TODO 8: return the value ({ favorites, isFavorite, toggleFavorite }).
}

export default useFavorites
