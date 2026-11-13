import { Badge, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// One recipe as a card: picture, name and link
function MealCard({ meal, badge, children }) {
  const recipeUrl = `/recipe/${meal.idMeal}`

  return (
    <Card className="meal-card h-100 shadow-sm">
      {/* Decorative picture, hidden from screen readers (the title is the link) */}
      <Link to={recipeUrl} tabIndex={-1} aria-hidden="true">
        <Card.Img
          variant="top"
          src={meal.strMealThumb}
          alt=""
          loading="lazy"
          className="meal-card-img"
        />
      </Link>
      <Card.Body className="d-flex flex-column">
        <Card.Title as="h3" className="h6">
          <Link to={recipeUrl} className="meal-card-link">
            {meal.strMeal}
          </Link>
        </Card.Title>
        {badge && (
          <div>
            <Badge bg="success">{badge}</Badge>
          </div>
        )}
        {children && <div className="mt-auto pt-2">{children}</div>}
      </Card.Body>
    </Card>
  )
}

export default MealCard
