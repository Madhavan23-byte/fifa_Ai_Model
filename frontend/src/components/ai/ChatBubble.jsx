import { User, Sparkles } from 'lucide-react'
import { cn } from '@/utils/cn'

/**
 * Chat bubble for AI conversations.
 * Renders user messages as simple aligned bubbles, and assistant messages
 * with a distinct avatar and formatted markdown-like content.
 */
export function ChatBubble({ role, content, actionRequired, onRetry }) {
  const isUser = role === 'user'

  return (
    <div className={cn('flex gap-4 max-w-4xl w-full', isUser ? 'ml-auto justify-end' : '')}>
      {/* Avatar (Assistant only) */}
      {!isUser && (
        <div className="w-8 h-8 rounded-xl bg-stadium-500/20 border border-stadium-500/30 flex items-center justify-center flex-shrink-0 mt-1">
          <Sparkles className="w-4 h-4 text-stadium-400" aria-hidden="true" />
        </div>
      )}

      {/* Bubble Container */}
      <div
        className={cn(
          'px-5 py-4 rounded-2xl text-sm leading-relaxed overflow-hidden',
          isUser
            ? 'bg-white/10 text-white border border-white/[0.08] rounded-tr-sm'
            : 'glass border border-white/[0.06] rounded-tl-sm text-white/80',
          actionRequired && !isUser ? 'border-red-500/30 bg-red-500/[0.02]' : ''
        )}
      >
        {/* Very basic markdown rendering for bold and bullets */}
        <div className="whitespace-pre-wrap space-y-3">
          {content.split('\n').map((line, i) => {
            if (line.startsWith('### ')) {
              return <h3 key={i} className="text-white font-bold mt-4 mb-2 first:mt-0 text-sm tracking-wide">{line.replace('### ', '')}</h3>
            }
            if (line.startsWith('- ')) {
              const boldedLine = line.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
              return (
                <div key={i} className="flex gap-2 items-start">
                  <span className="text-stadium-500 mt-1 flex-shrink-0">•</span>
                  <span dangerouslySetInnerHTML={{ __html: boldedLine }} />
                </div>
              )
            }
            const boldedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
            return <p key={i} className="min-h-[1em]" dangerouslySetInnerHTML={{ __html: boldedLine }} />
          })}
        </div>
        
        {/* Action badge for Copilot high-priority items */}
        {actionRequired && (
          <div className="mt-4 pt-3 border-t border-red-500/20 flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-[11px] font-bold tracking-widest uppercase text-red-400">Action Required</span>
          </div>
        )}

        {/* Retry Button */}
        {onRetry && (
          <div className="mt-4 pt-3 border-t border-red-500/20 flex items-center">
            <button 
              onClick={onRetry}
              className="text-xs font-bold text-red-400 hover:text-red-300 transition-colors uppercase tracking-widest bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20"
            >
              Retry Connection
            </button>
          </div>
        )}
      </div>
      
      {/* Avatar (User only) */}
      {isUser && (
        <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 mt-1">
          <User className="w-4 h-4 text-white/50" aria-hidden="true" />
        </div>
      )}
    </div>
  )
}
