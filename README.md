# Trademark Date Mate

A small tool that estimates a USPTO trademark application timeline. Pick a filing date and see
scenario projections side by side (by default: no issues, minor office action, substantive
office action), each with milestone dates through registration.

Built to be embedded on a law firm's website, with the firm's own colors, wording and timelines.

## Embed it on a website

Paste this where the estimator should appear (works on WordPress, Squarespace, Wix, plain HTML):

```html
<script src="https://nkostelnik.github.io/trademark-date-mate/embed.js"></script>
```

The script inserts an iframe and resizes it to fit its content. Prefer a plain iframe? Use:

```html
<iframe src="https://nkostelnik.github.io/trademark-date-mate/?embed=1"
        title="Trademark timeline estimator" style="width:100%;height:1250px;border:0"></iframe>
```

(A plain iframe needs a fixed height; the script version sizes itself.)

## Configuration

Every option is a URL parameter. With `embed.js`, use `data-` attributes instead:

```html
<script src="https://nkostelnik.github.io/trademark-date-mate/embed.js"
        data-accent="#1d4ed8"
        data-title="Smith &amp; Co IP"
        data-disclaimer="Estimates only. Contact us for advice on your matter."></script>
```

| Option | Values | Notes |
| --- | --- | --- |
| `accent` | hex color, e.g. `#1d4ed8` | Icon and focus color |
| `theme` | `light`, `dark`, `auto` | Default `light` when embedded, `auto` standalone |
| `title`, `intro` | text | Shown on the standalone page only (embeds have no header) |
| `logo` | `https://` image URL | Replaces the icon on the standalone page |
| `disclaimer` | text | Replaces the footer disclaimer (it cannot be hidden) |
| `scenarios` | JSON array (see below) | Override or add scenarios |
| `config` | `https://` URL to a JSON file | Same options as a file you host; URL/data options win over the file |
| `embed` | `1` | Embed mode (set automatically by `embed.js`) |

### Changing the timelines

`scenarios` is a JSON array. Entries whose `id` matches a default (`smooth`, `minor`,
`substantive`) only need the fields you want to change; new ids need `title`, `description` and
`estimatedMonths`. `color` is `stone`, `amber` or `rose`. Milestones are `{ "label", "monthOffset" }`
with offsets in months from the filing date.

```json
{
  "accent": "#1d4ed8",
  "scenarios": [
    { "id": "smooth", "estimatedMonths": 12 },
    { "id": "opposition", "title": "Opposition", "description": "A third party opposes.",
      "estimatedMonths": 36, "color": "rose",
      "milestones": [{ "label": "Opposition filed", "monthOffset": 13 }] }
  ]
}
```

Host that as a JSON file (with CORS enabled) and point `config` / `data-config` at it. Invalid
values are ignored and fall back to defaults. Limits: 6 scenarios, up to 120 months.

## Self-hosting

`npm run build` produces a static `dist/` folder with relative paths; upload it anywhere. The
included GitHub Actions workflow deploys `main` to GitHub Pages.

## Develop

```bash
npm install
npm run dev
```

`public/example.html` is a mock law-firm page with the embed on it.

## Stack

React 19, TypeScript, Vite, Tailwind CSS v4, `date-fns`, `motion`, `lucide-react`, `clsx`,
`tailwind-merge`.

## Disclaimer

The default timelines are rough, commonly cited USPTO timeframes, not legal advice or a
guarantee. Actual pendency varies by class, art unit and case-specific issues. Firms should
review the timelines and disclaimer text before publishing.

## License

MIT
