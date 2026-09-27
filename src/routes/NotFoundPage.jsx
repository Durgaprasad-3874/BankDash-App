import { Link } from 'react-router-dom'
import { Button } from '../components/common/Button'

export function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <p className="text-6xl font-bold text-primary">404</p>
      <p className="text-lg font-semibold text-ink-soft">Page not found</p>
      <p className="max-w-sm text-sm text-ink-muted">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link to="/">
        <Button>Back to Dashboard</Button>
      </Link>
    </div>
  )
}
