import { Badge, Col, ListGroup, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { getIngredientList, urls } from '../api/mealApi.js'
import ErrorMessage from '../components/ErrorMessage.jsx'
import FavoriteButton from '../components/FavoriteButton.jsx'
import Loader from '../components/Loader.jsx'
import useFetch from '../hooks/useFetch.js'

// Recipe screen: everything about one meal.
// The meal id comes from the URL, e.g. /recipe/52772 -> id = "52772".
function Recipe() {
  const { id } = useParams()
  const { data, loading, error } = useFetch(urls.byId(id))

  if (loading) {
    return <Loader text="Loading recipe…" />
  }

  if (error) {
    return (
      <ErrorMessage message={error} onRetry={() => window.location.reload()} />
    )
  }

  // lookup.php answers with a list of one meal, or an empty list
  // (after fetchJson) when the id does not exist.
  const meal = data[0]

  if (!meal) {
    return (
      <>
        <h1 className="h2">Recipe not found</h1>
        <p>
          We could not find a recipe with this id.{' '}
          <Link to="/browse">Browse all recipes</Link>
        </p>
      </>
    )
  }

  const ingredients = getIngredientList(meal)

  // Older meals have strArea ("Japanese"), newer ones only strCountry.
  const cuisine = meal.strArea ?? meal.strCountry

  // strTags is one string like "Meat,Casserole", or null
  const tags = meal.strTags ? meal.strTags.split(',') : []

  // The instructions are one long text with line breaks. We split it into
  // lines, remove empty ones, and show each line as its own paragraph.
  const steps = meal.strInstructions
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line !== '')

  return (
    <article>
      <Link to={`/browse?category=${encodeURIComponent(meal.strCategory)}`}>
        ← More {meal.strCategory} recipes
      </Link>

      {/* On phones the two columns stack; from "md" they sit side by side */}
      <Row className="g-4 mt-1">
        <Col md={5}>
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="img-fluid rounded shadow-sm"
          />
        </Col>

        <Col md={7}>
          <h1 className="h2">{meal.strMeal}</h1>

          <div className="d-flex flex-wrap gap-2 mb-3">
            <Badge bg="success">{meal.strCategory}</Badge>
            {cuisine && <Badge bg="secondary">{cuisine}</Badge>}
            {tags.map((tag) => (
              <Badge key={tag} bg="light" text="dark" className="border">
                {tag}
              </Badge>
            ))}
          </div>

          <FavoriteButton meal={meal} />

          <h2 className="h4 mt-4">Ingredients</h2>
          <ListGroup variant="flush">
            {ingredients.map((item, index) => (
              // The same ingredient can appear twice in a recipe, so the
              // index is added to keep the key unique.
              <ListGroup.Item key={`${item.name}-${index}`}>
                <strong>{item.measure}</strong> {item.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>

      <section className="mt-4">
        <h2 className="h4">Instructions</h2>
        {steps.map((step, index) => (
          <p key={index}>{step}</p>
        ))}

        {meal.strYoutube && (
          <a href={meal.strYoutube} target="_blank" rel="noreferrer">
            Watch the video on YouTube (opens in a new tab)
          </a>
        )}
      </section>
    </article>
  )
}

export default Recipe
