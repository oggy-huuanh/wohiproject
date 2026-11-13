import { useContext } from 'react'
import { FavoritesContext } from '../context/favoritesContext.js'

// Small helper so components can write useFavorites()
// instead of useContext(FavoritesContext) every time
function useFavorites() {

    const val = useContext(FavoritesContext)


    if (val == null){
        throw new Error('useFavorites must be used within a FavoritesProvider')
    }
    else{
        return val;
    }


}

export default useFavorites
