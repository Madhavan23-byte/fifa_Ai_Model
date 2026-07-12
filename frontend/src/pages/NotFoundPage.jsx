import { Link } from 'react-router-dom'
import { ArrowLeft, Zap } from 'lucide-react'
import { Button } from '@/components/common'

/** 404 Not Found page. */
export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 px-4 text-center">
      {/* Brand mark */}
      <div className="w-14 h-14 rounded-2xl bg-stadium-500/[0.12] border border-stadium-500/[0.2] flex items-center justify-center">
        <Zap className="w-6 h-6 text-stadium-400" aria-hidden="true" />
      </div>

      {/* Headline */}
      <div className="space-y-3">
        <p className="text-9xl font-black text-white/[0.06] select-none" aria-hidden="true">
          404
        </p>
        <h1 className="text-2xl font-bold text-white -mt-8">Page not found</h1>
        <p className="text-white/35 text-sm max-w-xs leading-relaxed">
          This page doesn't exist or has been moved. Head back to the Command Center.
        </p>
      </div>

      {/* CTA */}
      <Link to="/">
        <Button
          variant="primary"
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          aria-label="Return to StadiumOps AI home page"
        >
          Back to Home
        </Button>
      </Link>
    </div>
  )
}
