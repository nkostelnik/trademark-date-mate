import { Stamp } from 'lucide-react'

export function Header() {
  return (
    <header className="mx-auto w-full max-w-4xl px-4 pt-10 pb-6 text-center">
      <div className="mb-3 inline-flex items-center justify-center rounded-2xl bg-teal-600 p-3 text-white shadow-sm">
        <Stamp className="h-6 w-6" strokeWidth={2} />
      </div>
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">
        TrademarkMate
      </h1>
      <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500 dark:text-slate-400">
        Pick a filing date and see how long registration is likely to take under three
        common USPTO examination scenarios.
      </p>
    </header>
  )
}
