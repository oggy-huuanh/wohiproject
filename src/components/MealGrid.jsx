import { Col, Row } from 'react-bootstrap'
import FavoriteButton from './FavoriteButton.jsx'
import MealCard from './MealCard.jsx'

// Responsive grid of meal cards
function MealGrid({ meals, getBadge }) {
  return (
    <Row xs={1} sm={2} md={3} lg={4} className="g-3">
      {meals.map((meal) => (
        <Col key={meal.idMeal}>
          <MealCard meal={meal} badge={getBadge ? getBadge(meal) : undefined}>
            <FavoriteButton meal={meal} size="sm" />
          </MealCard>
        </Col>
      ))}
    </Row>
  )
}

export default MealGrid
