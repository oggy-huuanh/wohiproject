import useFetch from "../hooks/useFetch.js";
import {findMealsByIngredients, urls} from "../api/mealApi.js";
import Select from 'react-select'
import {useState} from "react";
import MealGrid from "../components/MealGrid.jsx";
import {Button} from "react-bootstrap";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

function Pantry() {
  const { data: ingredients, loading: loadingList, error: listError } = useFetch(urls.ingredients())
  const ingreInfo = ingredients.map(ingredient => ({ value: ingredient.strIngredient, label: ingredient.strIngredient }))
  const [selected, setSelected] = useState([])
  const [searching, setSearching] = useState(false)
  const [searchError, setSearchError] = useState(null)
  const [meals, setMeals] = useState(null)
  async function handleSearch(){
    setSearching(true)
    setSearchError(null)
    try{
      const names = selected.map(option => option.value)
      const result = await findMealsByIngredients(names)
      setMeals(result)
    } catch (err){
      setSearchError(err.message)
    } finally {
      setSearching(false)
    }
  }
  return <div>
    <h1>The Pantry</h1>
    <p>Here you can find recipes using your ingredients.</p>
    <Select isMulti options={ingreInfo} value={selected} onChange={setSelected} isLoading={loadingList} placeholder="Type an ingredient, for example, chicken" aria-label="Your ingredients" />
    <Button variant = "success" onClick={handleSearch} disabled={selected.length === 0 || searching}>Search</Button>
    {searching && <Loader text="Finding recipes…" />}
    {searchError && <ErrorMessage message={searchError} onRetry={handleSearch} />}
    {listError && <ErrorMessage message={listError} />}
    {meals && meals.length === 0 && <p>No recipes found...</p>}
    {meals && meals.length > 0 && (
        <MealGrid meals={meals} getBadge={(meal) => `Uses ${meal.matchCount} of your ingredients`} />
    )}
  </div>
}


export default Pantry

