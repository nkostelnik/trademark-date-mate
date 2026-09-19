// Tailwind's scanner only picks up class names that appear literally in source,
// so scenario colors are mapped through this static table rather than built
// dynamically from the `color` string on each scenario.
export interface ColorTheme {
  card: string
  ring: string
  badge: string
  accentText: string
  accentBg: string
  dot: string
  line: string
}

export const COLOR_THEMES: Record<string, ColorTheme> = {
  stone: {
    card: 'bg-stone-50 dark:bg-stone-900/40',
    ring: 'ring-stone-200 dark:ring-stone-700/60',
    badge: 'bg-stone-200 text-stone-700 dark:bg-stone-800 dark:text-stone-300',
    accentText: 'text-stone-700 dark:text-stone-300',
    accentBg: 'bg-stone-500',
    dot: 'bg-stone-500',
    line: 'bg-stone-300 dark:bg-stone-700',
  },
  amber: {
    card: 'bg-amber-50 dark:bg-amber-900/20',
    ring: 'ring-amber-200 dark:ring-amber-800/60',
    badge: 'bg-amber-200 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300',
    accentText: 'text-amber-700 dark:text-amber-400',
    accentBg: 'bg-amber-500',
    dot: 'bg-amber-500',
    line: 'bg-amber-300 dark:bg-amber-700/60',
  },
  rose: {
    card: 'bg-rose-50 dark:bg-rose-900/20',
    ring: 'ring-rose-200 dark:ring-rose-800/60',
    badge: 'bg-rose-200 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300',
    accentText: 'text-rose-700 dark:text-rose-400',
    accentBg: 'bg-rose-500',
    dot: 'bg-rose-500',
    line: 'bg-rose-300 dark:bg-rose-700/60',
  },
}

export function getColorTheme(color: string): ColorTheme {
  return COLOR_THEMES[color] ?? COLOR_THEMES.stone
}
