import { Alert, Button } from 'react-bootstrap'

// Shown when an API call fails, with an optional "Try again" button
function ErrorMessage({ message, onRetry }) {
  return (
    <Alert variant="danger" className="my-3">
      <Alert.Heading as="h2" className="h5">
        Something went wrong
      </Alert.Heading>
      <p className="mb-0">
        {message || 'We could not load the recipes. Check your connection.'}
      </p>
      {onRetry && (
        <Button variant="outline-danger" className="mt-3" onClick={onRetry}>
          Try again
        </Button>
      )}
    </Alert>
  )
}

export default ErrorMessage
