import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { Header } from './components/Header'
import { FilingDateInput } from './components/FilingDateInput'
import { ScenarioCard } from './components/ScenarioCard'
import { calculateTrademarkDates } from './services/trademarkService'
import { fetchRemoteConfig, getConfigUrl, resolveConfig, type ThemeMode } from './lib/config'
import { cn } from './lib/utils'

function useTheme(mode: ThemeMode) {
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = () => {
      const dark = mode === 'dark' || (mode === 'auto' && media.matches)
      document.documentElement.classList.toggle('dark', dark)
      document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
    }
    apply()
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [mode])
}

// Tells the host page (see public/embed.js) how tall the embed is so it can resize the iframe.
function useReportHeight(enabled: boolean) {
  useEffect(() => {
    if (!enabled || window.parent === window) return
    const post = () =>
      window.parent.postMessage(
        { type: 'trademark-date-mate:height', height: document.body.getBoundingClientRect().height },
        '*',
      )
    const observer = new ResizeObserver(post)
    observer.observe(document.body)
    post()
    return () => observer.disconnect()
  }, [enabled])
}

function App() {
  const [filingDate, setFilingDate] = useState(() => new Date())
  const [config, setConfig] = useState(() => resolveConfig(window.location.search))

  useEffect(() => {
    const url = getConfigUrl(window.location.search)
    if (!url) return
    let cancelled = false
    fetchRemoteConfig(url).then((remote) => {
      if (!cancelled && remote) setConfig(resolveConfig(window.location.search, remote))
    })
    return () => {
      cancelled = true
    }
  }, [])

  useTheme(config.theme)
  useReportHeight(config.embed)

  const results = useMemo(
    () => calculateTrademarkDates(filingDate, config.scenarios),
    [filingDate, config.scenarios],
  )

  return (
    <div
      style={{ '--accent': config.accent } as CSSProperties}
      className={cn(!config.embed && 'min-h-svh bg-slate-100 dark:bg-slate-950')}
    >
      {!config.embed && (
        <Header title={config.title} intro={config.intro} logoUrl={config.logoUrl} />
      )}

      <div className={cn(config.embed && 'pt-2')}>
        <FilingDateInput filingDate={filingDate} onChange={setFilingDate} />
      </div>

      <main className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-4 px-4 py-6 md:grid-cols-3">
        {config.scenarios.map((scenario, i) => {
          const result = results.find((r) => r.scenarioId === scenario.id)!
          return <ScenarioCard key={scenario.id} scenario={scenario} result={result} index={i} />
        })}
      </main>

      <footer className="mx-auto w-full max-w-4xl px-4 pb-8 text-center text-xs text-slate-500 dark:text-slate-500">
        {config.disclaimer}
      </footer>
    </div>
  )
}

export default App
