# TrademarkMate

A small React + Vite tool that estimates a USPTO trademark application timeline. Pick a
filing date and see three scenario projections side by side:

- **No Issues (Smooth Sailing)** - straight through to registration, ~14 months.
- **Minor Office Action** - a resolvable issue (disclaimer, goods/services clarification), ~18 months.
- **Substantive Office Action** - a major issue (likelihood of confusion, descriptiveness), ~24 months.

Each card shows the milestone dates (examiner assignment, office action response, publication,
registration) computed from the chosen filing date.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4 (`@tailwindcss/vite`)
- `date-fns` for date math/formatting
- `motion` for card/timeline entrance animation
- `lucide-react` for icons
- `clsx` + `tailwind-merge` (via `src/lib/utils.ts#cn`) for conditional class names

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Notes

The estimates in `src/services/trademarkService.ts` (`SCENARIOS`) are rough, commonly-cited
USPTO timeframes, not legal advice or a guarantee - actual pendency varies by class, art unit,
and case-specific issues.
