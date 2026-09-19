import { motion } from 'motion/react'
import { FlagTriangleRight } from 'lucide-react'
import type { TrademarkScenario, CalculationResult } from '../services/trademarkService'
import { getColorTheme } from '../lib/colors'
import { cn } from '../lib/utils'
import { MilestoneTimeline } from './MilestoneTimeline'

interface ScenarioCardProps {
  scenario: TrademarkScenario
  result: CalculationResult
  index: number
}

export function ScenarioCard({ scenario, result, index }: ScenarioCardProps) {
  const theme = getColorTheme(scenario.color)

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
      className={cn(
        'flex flex-col rounded-2xl p-5 shadow-sm ring-1',
        theme.card,
        theme.ring,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          {scenario.title}
        </h2>
        <span
          className={cn(
            'shrink-0 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap',
            theme.badge,
          )}
        >
          ~{scenario.estimatedMonths} mo
        </span>
      </div>

      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{scenario.description}</p>

      <div className={cn('mt-4 flex items-center gap-2 text-sm font-medium', theme.accentText)}>
        <FlagTriangleRight className="h-4 w-4" />
        Estimated registration: {result.formattedDate}
      </div>

      <MilestoneTimeline
        steps={[...result.milestones, { label: 'Registration', formattedDate: result.formattedDate }]}
        theme={theme}
      />
    </motion.article>
  )
}
