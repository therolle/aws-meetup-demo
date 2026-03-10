# Design System

Design tokens, patterns, and component guidelines for the AWS Meetup Demo app. Built with Tailwind CSS v4.

## Colors

All custom colors are defined via `@theme` in `src/index.css`. Use Tailwind classes, not raw hex values.

| Token            | Value     | Tailwind Class   | Usage                          |
|------------------|-----------|------------------|--------------------------------|
| `--color-primary`      | `#047d95` | `bg-primary`, `text-primary` | Primary actions, CTA buttons |
| `--color-primary-dark` | `#036b80` | `bg-primary-dark`, `hover:bg-primary-dark` | Primary button hover state |

### Gray Palette (Tailwind defaults)

| Class          | Usage                                      |
|----------------|--------------------------------------------|
| `gray-900`     | Headings, primary text                     |
| `gray-800`     | Body text, list item content               |
| `gray-700`     | Secondary button text                      |
| `gray-500`     | Placeholder / empty state text             |
| `gray-200`     | Borders, secondary button backgrounds      |
| `white`        | Card backgrounds                           |
| `#f8fafc`      | Page background (set on `body` in CSS)     |

### Semantic Colors

| Class                    | Usage              |
|--------------------------|--------------------|
| `text-red-500`           | Destructive action |
| `hover:text-red-700`     | Destructive hover  |

## Typography

- **Font stack**: Inter, system-ui, -apple-system, sans-serif (set on `:root`)
- **Headings**: `text-2xl font-bold text-gray-900`
- **Body text**: `text-gray-800` (default size)
- **Small / secondary text**: `text-sm font-medium`
- **Empty state**: `text-center text-gray-500`

## Spacing & Layout

- **Page container**: `mx-auto max-w-xl px-4 py-10`
- **Section gap**: `mb-8` between header and content
- **List spacing**: `space-y-2` between items
- **Button-to-content gap**: `mb-6`

## Components

### Primary Button

Full-width CTA with primary color and hover transition.

```html
<button class="w-full rounded-lg bg-primary px-4 py-2.5 text-white font-medium hover:bg-primary-dark transition-colors">
  Label
</button>
```

### Secondary Button

Compact, gray-toned for secondary actions (e.g., sign out).

```html
<button class="rounded-md bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-300">
  Label
</button>
```

### Destructive Text Button

Inline text button for delete actions.

```html
<button class="text-sm text-red-500 hover:text-red-700">
  Delete
</button>
```

### Card / List Item

Used for todo items. White background, border, subtle shadow.

```html
<li class="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm">
  <span class="text-gray-800">Content</span>
  <!-- actions -->
</li>
```

## Adding New Colors

Add tokens in `src/index.css` under the `@theme` block — **not** in a `tailwind.config.js` file (Tailwind v4 does not use config files):

```css
@theme {
  --color-primary: #047d95;
  --color-primary-dark: #036b80;
  --color-your-new-color: #hexvalue;
}
```

The token name becomes a Tailwind utility automatically: `bg-your-new-color`, `text-your-new-color`, etc.

## Auth UI

The Amplify `<Authenticator>` component handles sign-in/sign-up screens. Its container is centered via:

```css
[data-amplify-authenticator] {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
```

Do not override Amplify's built-in auth form styles unless theming the Authenticator explicitly.
