import { Wind, Droplets, Eye, Sun } from 'lucide-react'
import { WEATHER } from '@/utils/dashboardData'

/**
 * Weather / Stadium Conditions widget.
 * Displays current temperature, condition, and environmental detail grid.
 */
export function WeatherCard() {
  const { temp, unit, condition, humidity, wind, windUnit, feelsLike, visibility, uv, emoji } = WEATHER

  const details = [
    { icon: Droplets, label: 'Humidity',   value: `${humidity}%`        },
    { icon: Wind,     label: 'Wind',        value: `${wind} ${windUnit}` },
    { icon: Eye,      label: 'Visibility',  value: visibility             },
    { icon: Sun,      label: 'UV Index',    value: uv                     },
  ]

  return (
    <div className="glass rounded-2xl h-full" role="region" aria-label="Stadium weather conditions">
      {/* Header */}
      <div className="px-5 py-3 border-b border-white/[0.06]">
        <h3 className="text-white/60 text-[11px] font-black tracking-widest uppercase">
          Stadium Conditions
        </h3>
      </div>

      <div className="p-5 space-y-5">
        {/* Primary temperature display */}
        <div className="text-center py-2">
          <div className="text-5xl mb-3" role="img" aria-label={condition}>{emoji}</div>
          <div
            className="text-4xl font-black text-white"
            aria-label={`Temperature: ${temp}${unit}`}
          >
            {temp}{unit}
          </div>
          <div className="text-white/40 text-sm mt-1.5">{condition}</div>
          <div className="text-white/25 text-xs mt-0.5">Feels like {feelsLike}{unit}</div>
        </div>

        {/* Detail grid */}
        <div className="grid grid-cols-2 gap-2">
          {details.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="glass rounded-xl p-3 flex items-center gap-2.5"
              aria-label={`${label}: ${value}`}
            >
              <Icon className="w-4 h-4 text-white/25 flex-shrink-0" aria-hidden="true" />
              <div>
                <div className="text-white/25 text-[10px] font-medium leading-none mb-0.5">{label}</div>
                <div className="text-white font-semibold text-sm leading-none">{value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Conditions note */}
        <div className="glass rounded-xl px-4 py-3 border border-stadium-500/[0.12]">
          <p className="text-stadium-400 text-xs font-medium leading-snug">
            ✅ Excellent conditions for football — clear skies, low UV, calm wind.
          </p>
        </div>
      </div>
    </div>
  )
}
