import ErrorMessage from "../components/ErrorMessage.jsx";
import Loader from "../components/Loader.jsx";
import MealCard from "../components/MealCard.jsx";
import useFetch from "../hooks/useFetch.js";
import {urls} from "../api/mealApi.js";
import {Link} from "react-router-dom";

function Home() {
  const { data, loading, error } = useFetch(urls.random())
  const meal = data[0]
  return <div>
  <h1>Delicious Meals</h1>
  <p>This website is a place to find your next meal! Whenever and whatever you need for!</p>
    <Link className = "btn btn-success" to="/pantry">Pantry</Link>
    <Link className = "btn btn-success" to="/browse">Browse</Link>
    <h2 className="h4 mt-4">Try this recipe</h2>
    {loading && <Loader />} {error && <ErrorMessage message={error} />}
    <div style={{ maxWidth: '320px' }}> {meal && <MealCard meal={meal} />}</div>
  </div>

}

export default Home
