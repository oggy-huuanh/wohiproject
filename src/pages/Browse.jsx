import { Button } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import { urls } from '../api/mealApi.js'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Loader from '../components/Loader.jsx'
import MealGrid from '../components/MealGrid.jsx'
import useFetch from '../hooks/useFetch.js'

// Browse screen
function Browse() {
  // The chosen category is kept in the URL (/browse?category=Dessert)
  // instead of useState.
  const [searchParams, setSearchParams] = useSearchParams()
  const selected = searchParams.get('category') // null when nothing is chosen

  // Request 1: the list of categories, loaded once when the page opens
  const categories = useFetch(urls.categories())

  // Request 2: the meals of the chosen category
  const meals = useFetch(selected ? urls.byCategory(selected) : null)

  function reloadPage() {
    window.location.reload()
  }

  return (
    <>
      <h1 className="h2">Browse recipes</h1>
      <p className="text-muted">Choose a category to see its recipes.</p>

      {categories.loading && <Loader text="Loading categories…" />}

      {categories.error && (
        <ErrorMessage message={categories.error} onRetry={reloadPage} />
      )}


      <div className="d-flex flex-wrap gap-2 mb-4">
        {categories.data.map((category) => {
          const name = category.strCategory
          const isSelected = name === selected

          return (
            <Button
              key={category.idCategory}
              variant={isSelected ? 'success' : 'outline-success'}
              aria-pressed={isSelected}
              onClick={() => setSearchParams({ category: name })}
            >
              {name}
            </Button>
          )
        })}
      </div>

      {/* Everything below is only shown after a category has been chosen */}
      {selected && (
        <section aria-live="polite">
          <h2 className="h4 mb-3">{selected}</h2>

          {meals.loading && <Loader text={`Loading ${selected} recipes…`} />}

          {meals.error && (
            <ErrorMessage message={meals.error} onRetry={reloadPage} />
          )}

          {!meals.loading && !meals.error && meals.data.length === 0 && (
            <p>No recipes found in this category.</p>
          )}

          {!meals.loading && !meals.error && meals.data.length > 0 && (
            <>
              <p className="text-muted">{meals.data.length} recipes</p>
              <MealGrid meals={meals.data} />
            </>
          )}
        </section>
      )}
    </>
  )
}

export default Browse
