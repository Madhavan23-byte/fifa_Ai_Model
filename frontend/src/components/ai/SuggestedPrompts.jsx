import { Sparkles } from 'lucide-react'

/**
 * Clickable pill buttons for suggested AI prompts
 */
export function SuggestedPrompts({ prompts, onSelect }) {
  if (!prompts || prompts.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 pt-4">
      {prompts.map((prompt) => (
        <button
          key={prompt.id}
          onClick={() => onSelect(prompt.label)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-white/60 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:text-white transition-colors"
        >
          <Sparkles className="w-3 h-3 text-stadium-400/70" />
          {prompt.label}
        </button>
      ))}
    </div>
  )
}
