import { useMemo, useState } from 'react'
import { Header } from './components/Header'
import { FilingDateInput } from './components/FilingDateInput'
import { ScenarioCard } from './components/ScenarioCard'
import { SCENARIOS, calculateTrademarkDates } from './services/trademarkService'

function App() {
  const [filingDate, setFilingDate] = useState(() => new Date())

  const results = useMemo(() => calculateTrademarkDates(filingDate), [filingDate])

  return (
    <div className="min-h-svh bg-slate-100 dark:bg-slate-950">
      <Header />

      <FilingDateInput filingDate={filingDate} onChange={setFilingDate} />

      <main className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-4 px-4 py-8 md:grid-cols-3">
        {SCENARIOS.map((scenario, i) => {
          const result = results.find((r) => r.scenarioId === scenario.id)!
          return <ScenarioCard key={scenario.id} scenario={scenario} result={result} index={i} />
        })}
      </main>

      <footer className="mx-auto w-full max-w-4xl px-4 pb-10 text-center text-xs text-slate-400 dark:text-slate-600">
        Estimates only, based on typical USPTO timelines. Actual processing times vary by
        examining attorney, art unit workload, and case-specific issues.
      </footer>
    </div>
  )
}

export default App
