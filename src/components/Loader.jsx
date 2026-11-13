import { Spinner } from 'react-bootstrap'

// Shown while waiting for the API
function Loader({ text = 'Loading…' }) {
  return (
    <div
      className="d-flex align-items-center justify-content-center gap-2 py-5"
      role="status"
    >
      <Spinner animation="border" variant="success" aria-hidden="true" />
      <span>{text}</span>
    </div>
  )
}

export default Loader
