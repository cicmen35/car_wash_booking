interface ErrorMessageProps {
  message: string
}

function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) {
    return null
  }

  return (
    <p className="message message--error" role="alert">
      {message}
    </p>
  )
}

export default ErrorMessage
