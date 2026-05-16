interface LoadingSpinnerProps {
  label?: string
}

function LoadingSpinner({ label = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <div className="loading-spinner" role="status" aria-live="polite">
      <span className="loading-spinner__icon" aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}

export default LoadingSpinner
