import { SCENARIOS, type TrademarkScenario } from '../services/trademarkService'

export type ThemeMode = 'light' | 'dark' | 'auto'

export interface AppConfig {
  embed: boolean
  theme: ThemeMode
  accent: string
  title: string
  intro: string
  disclaimer: string
  logoUrl: string | null
  scenarios: TrademarkScenario[]
}

export type ConfigOverrides = Partial<Omit<AppConfig, 'embed'>>

export const DEFAULT_CONFIG: AppConfig = {
  embed: false,
  theme: 'auto',
  accent: '#0f766e',
  title: 'TrademarkMate',
  intro:
    'Pick a filing date and see how long registration is likely to take under three common USPTO examination scenarios.',
  disclaimer:
    'Estimates only, based on typical USPTO timelines. Actual processing times vary by examining attorney, art unit workload, and case-specific issues. This tool is not legal advice and does not create an attorney-client relationship.',
  logoUrl: null,
  scenarios: SCENARIOS,
}

const COLORS = new Set(['stone', 'amber', 'rose'])
const MAX_SCENARIOS = 6
const MAX_MONTHS = 120

function text(value: unknown, max: number): string | undefined {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim().slice(0, max)
  return trimmed || undefined
}

function months(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= MAX_MONTHS
    ? Math.round(value)
    : undefined
}

function sanitizeAccent(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  const match = /^#?([0-9a-fA-F]{6})$/.exec(value.trim())
  return match ? `#${match[1]}` : undefined
}

// Only https images (or http on localhost for testing) are accepted for the logo.
function sanitizeUrl(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  try {
    const url = new URL(value.trim())
    const localhost = url.hostname === 'localhost' || url.hostname === '127.0.0.1'
    if (url.protocol === 'https:' || (url.protocol === 'http:' && localhost)) return url.href
  } catch {
    // not a valid URL
  }
  return undefined
}

function sanitizeScenario(raw: unknown): TrademarkScenario | undefined {
  if (!raw || typeof raw !== 'object') return undefined
  const r = raw as Record<string, unknown>
  const id = text(r.id, 40)
  if (!id) return undefined
  const base = SCENARIOS.find((s) => s.id === id)

  const milestones = Array.isArray(r.milestones)
    ? r.milestones.flatMap((m) => {
        const label = text((m as Record<string, unknown> | null)?.label, 60)
        const monthOffset = months((m as Record<string, unknown> | null)?.monthOffset)
        return label && monthOffset !== undefined ? [{ label, monthOffset }] : []
      })
    : undefined

  const merged = {
    id,
    title: text(r.title, 80) ?? base?.title,
    description: text(r.description, 400) ?? base?.description,
    estimatedMonths: months(r.estimatedMonths) ?? base?.estimatedMonths,
    color: typeof r.color === 'string' && COLORS.has(r.color) ? r.color : (base?.color ?? 'stone'),
    milestones: milestones ?? base?.milestones ?? [],
  }
  // Custom (non-default) scenarios must supply every required field.
  if (!merged.title || !merged.description || merged.estimatedMonths === undefined) return undefined
  return merged as TrademarkScenario
}

// Turns untrusted input (URL params or a remote JSON file) into safe overrides.
export function sanitize(raw: unknown): ConfigOverrides {
  if (!raw || typeof raw !== 'object') return {}
  const r = raw as Record<string, unknown>
  const out: ConfigOverrides = {}

  const title = text(r.title, 80)
  if (title) out.title = title
  const intro = text(r.intro, 400)
  if (intro) out.intro = intro
  const disclaimer = text(r.disclaimer, 800)
  if (disclaimer) out.disclaimer = disclaimer
  const accent = sanitizeAccent(r.accent)
  if (accent) out.accent = accent
  const logoUrl = sanitizeUrl(r.logo)
  if (logoUrl) out.logoUrl = logoUrl
  if (r.theme === 'light' || r.theme === 'dark' || r.theme === 'auto') out.theme = r.theme

  if (Array.isArray(r.scenarios)) {
    const scenarios = r.scenarios
      .slice(0, MAX_SCENARIOS)
      .map(sanitizeScenario)
      .filter((s): s is TrademarkScenario => s !== undefined)
    if (scenarios.length > 0) out.scenarios = scenarios
  }
  return out
}

function paramsToRaw(params: URLSearchParams): Record<string, unknown> {
  const raw: Record<string, unknown> = {}
  for (const key of ['title', 'intro', 'disclaimer', 'accent', 'logo', 'theme']) {
    const value = params.get(key)
    if (value !== null) raw[key] = value
  }
  const scenarios = params.get('scenarios')
  if (scenarios) {
    try {
      raw.scenarios = JSON.parse(scenarios)
    } catch {
      // ignore malformed JSON
    }
  }
  return raw
}

// Precedence: defaults < remote JSON file < URL parameters.
export function resolveConfig(search: string, remote?: unknown): AppConfig {
  const params = new URLSearchParams(search)
  const embed = params.get('embed') === '1' || params.get('embed') === 'true'
  const fromUrl = sanitize(paramsToRaw(params))
  const fromRemote = sanitize(remote)
  // Embedded widgets default to a light theme, since host sites are usually light.
  const base: AppConfig = { ...DEFAULT_CONFIG, embed, theme: embed ? 'light' : 'auto' }
  return { ...base, ...fromRemote, ...fromUrl }
}

export function getConfigUrl(search: string): string | null {
  const value = new URLSearchParams(search).get('config')
  return value ? (sanitizeUrl(value) ?? null) : null
}

export async function fetchRemoteConfig(url: string): Promise<unknown> {
  try {
    const res = await fetch(url, { credentials: 'omit' })
    if (!res.ok) return undefined
    return await res.json()
  } catch {
    return undefined
  }
}
