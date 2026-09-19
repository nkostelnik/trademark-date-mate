import { Stamp } from 'lucide-react'

interface HeaderProps {
  title: string
  intro: string
  logoUrl: string | null
}

export function Header({ title, intro, logoUrl }: HeaderProps) {
  return (
    <header className="mx-auto w-full max-w-4xl px-4 pt-10 pb-6 text-center">
      {logoUrl ? (
        <img src={logoUrl} alt="" className="mx-auto mb-3 h-12 w-auto max-w-[200px] object-contain" />
      ) : (
        <div className="mb-3 inline-flex items-center justify-center rounded-2xl bg-[var(--accent)] p-3 text-white shadow-sm">
          <Stamp className="h-6 w-6" strokeWidth={2} />
        </div>
      )}
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">
        {title}
      </h1>
      <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500 dark:text-slate-400">{intro}</p>
    </header>
  )
}
