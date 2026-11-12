import { Spinner } from 'react-bootstrap'

// Shown while we wait for the API. role="status" makes screen readers
// announce the text, so the wait is not only visible but also "audible".
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
