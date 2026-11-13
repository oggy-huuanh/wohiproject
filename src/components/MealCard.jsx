import { Badge, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// One recipe as a card: picture, name and a link to the recipe page.
// - meal: object from the API
// - badge: optional small label
// - children: optional extra content at the bottom
function MealCard({ meal, badge, children }) {
  const recipeUrl = `/recipe/${meal.idMeal}`

  return (
    <Card className="meal-card h-100 shadow-sm">
      {/* The picture is decoration here (the name is right below it), so the
          alt text is empty, and the link is hidden from keyboard and screen
          reader users. They use the title link instead of hearing it twice. */}
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
        {/* mt-auto pushes this to the bottom, so buttons line up in a row */}
        {children && <div className="mt-auto pt-2">{children}</div>}
      </Card.Body>
    </Card>
  )
}

export default MealCard
