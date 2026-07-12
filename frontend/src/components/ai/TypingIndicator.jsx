import { Sparkles } from 'lucide-react'

/**
 * Animated typing indicator for the AI assistant
 */
export function TypingIndicator() {
  return (
    <div className="flex gap-4 max-w-4xl w-full">
      <div className="w-8 h-8 rounded-xl bg-stadium-500/20 border border-stadium-500/30 flex items-center justify-center flex-shrink-0 mt-1">
        <Sparkles className="w-4 h-4 text-stadium-400" aria-hidden="true" />
      </div>

      <div className="glass border border-white/[0.06] rounded-2xl rounded-tl-sm px-5 py-5 flex items-center gap-1.5 h-12 w-20">
        <div className="w-1.5 h-1.5 rounded-full bg-stadium-400 animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-1.5 h-1.5 rounded-full bg-stadium-400 animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-1.5 h-1.5 rounded-full bg-stadium-400 animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  )
}
