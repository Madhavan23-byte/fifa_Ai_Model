/**
 * features/emergency/BroadcastPreview.jsx
 * Emergency broadcast preview card with language tabs.
 */
import { useState } from 'react'
import { Radio, Globe } from 'lucide-react'
import { BROADCAST_MESSAGES } from '@/utils/emergencyData'
import { cn } from '@/utils/cn'

const LANG_KEYS = ['en', 'es', 'fr', 'hi']

/**
 * Emergency broadcast preview with language tab switcher.
 */
export function BroadcastPreview() {
  const [activeLang, setActiveLang] = useState('en')
  const msg = BROADCAST_MESSAGES[activeLang]

  return (
    <div className="glass rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/[0.07] flex items-center gap-3 bg-red-500/[0.06]">
        <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center">
          <Radio className="w-4 h-4 text-red-400" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-white font-bold text-sm">Emergency Broadcast</h3>
          <p className="text-white/35 text-[11px]">Stadium-wide announcement preview</p>
        </div>
        {/* Live dot */}
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" aria-hidden="true" />
          <span className="text-red-400 text-[10px] font-bold">ACTIVE</span>
        </div>
      </div>

      {/* Language tabs */}
      <div
        className="flex gap-px border-b border-white/[0.07]"
        role="tablist"
        aria-label="Broadcast language selection"
      >
        {LANG_KEYS.map((key) => {
          const isActive = activeLang === key
          const lang = BROADCAST_MESSAGES[key]
          return (
            <button
              key={key}
              role="tab"
              aria-selected={isActive}
              aria-controls={`broadcast-panel-${key}`}
              id={`broadcast-tab-${key}`}
              onClick={() => setActiveLang(key)}
              className={cn(
                'flex-1 py-2.5 text-[11px] font-bold transition-all',
                isActive
                  ? 'text-white bg-white/[0.06] border-b-2 border-stadium-500'
                  : 'text-white/35 hover:text-white/60 border-b-2 border-transparent hover:bg-white/[0.03]',
              )}
            >
              {lang.lang}
            </button>
          )
        })}
      </div>

      {/* Message panel */}
      {LANG_KEYS.map((key) => (
        <div
          key={key}
          id={`broadcast-panel-${key}`}
          role="tabpanel"
          aria-labelledby={`broadcast-tab-${key}`}
          hidden={activeLang !== key}
          className="p-5 space-y-3"
        >
          {/* Title */}
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-white/30" aria-hidden="true" />
            <span className="text-white/35 text-[11px] font-bold uppercase tracking-widest">
              {BROADCAST_MESSAGES[key].lang}
            </span>
          </div>

          {/* Message box */}
          <div className="glass rounded-xl p-4 border border-red-500/15 bg-red-500/[0.04]">
            <p className="text-white/80 text-sm leading-relaxed">
              {BROADCAST_MESSAGES[key].message}
            </p>
          </div>

          {/* Send note */}
          <p className="text-white/25 text-[10px]">
            This message will broadcast to all stadium speakers and digital displays in {BROADCAST_MESSAGES[key].lang}.
          </p>
        </div>
      ))}
    </div>
  )
}
