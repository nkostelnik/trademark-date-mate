import { CalendarDays } from 'lucide-react'
import { format } from 'date-fns'

interface FilingDateInputProps {
  filingDate: Date
  onChange: (date: Date) => void
}

function toInputValue(date: Date) {
  return format(date, 'yyyy-MM-dd')
}

export function FilingDateInput({ filingDate, onChange }: FilingDateInputProps) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4">
      <label
        htmlFor="filing-date"
        className="flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:flex-row sm:items-center sm:justify-between dark:bg-slate-900 dark:ring-slate-800"
      >
        <span className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
          <CalendarDays className="h-4 w-4 text-[color:var(--accent)]" />
          Trademark application filing date
        </span>
        <input
          id="filing-date"
          type="date"
          value={toInputValue(filingDate)}
          onChange={(e) => {
            if (!e.target.value) return
            const [year, month, day] = e.target.value.split('-').map(Number)
            onChange(new Date(year, month - 1, day))
          }}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[color:var(--accent)] focus:ring-1 focus:ring-[color:var(--accent)] dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
        />
      </label>
    </div>
  )
}
