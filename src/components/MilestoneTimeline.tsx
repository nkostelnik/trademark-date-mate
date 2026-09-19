import { motion } from 'motion/react'
import { cn } from '../lib/utils'
import type { ColorTheme } from '../lib/colors'

interface TimelineStep {
  label: string
  formattedDate: string
}

interface MilestoneTimelineProps {
  steps: TimelineStep[]
  theme: ColorTheme
}

export function MilestoneTimeline({ steps, theme }: MilestoneTimelineProps) {
  return (
    <ol className="relative ml-1.5 mt-4 space-y-4 border-l border-slate-200 pl-5 dark:border-slate-700">
      {steps.map((step, i) => (
        <motion.li
          key={step.label}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06, duration: 0.25 }}
          className="relative"
        >
          <span
            className={cn(
              'absolute -left-[27px] top-1 h-2.5 w-2.5 rounded-full ring-4 ring-white dark:ring-slate-900',
              theme.dot,
            )}
          />
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{step.label}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">{step.formattedDate}</p>
        </motion.li>
      ))}
    </ol>
  )
}
