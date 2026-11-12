import { Col, Row } from 'react-bootstrap'
import MealCard from './MealCard.jsx'

// Responsive grid of meal cards, reused by Browse, My Pantry and Favorites.
// Bootstrap picks the number of columns from the screen width:
// 1 on phones, 2 from "sm", 3 from "md", 4 from "lg".
// - meals:    array of meals from the API
// - getBadge: optional function (meal) => text for the badge on each card
function MealGrid({ meals, getBadge }) {
  return (
    <Row xs={1} sm={2} md={3} lg={4} className="g-3">
      {meals.map((meal) => (
        <Col key={meal.idMeal}>
          <MealCard meal={meal} badge={getBadge ? getBadge(meal) : undefined} />
        </Col>
      ))}
    </Row>
  )
}

export default MealGrid
