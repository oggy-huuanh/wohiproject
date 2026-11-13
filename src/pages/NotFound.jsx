import { Link } from 'react-router-dom'

// Shown for any URL that does not match a route in App.jsx
function NotFound() {
  return (
    <>
      <h1 className="h2">Page not found</h1>
      <p>
        This page does not exist. <Link to="/">Go back to the home page</Link>
      </p>
    </>
  )
}

export default NotFound
