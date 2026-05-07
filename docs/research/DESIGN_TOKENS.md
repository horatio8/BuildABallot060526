# Design Tokens — buildaballot.org.au

## Colors (verbatim from getComputedStyle)
| Token | RGB | Hex | Usage |
|-------|-----|-----|-------|
| `--background` | rgb(244, 244, 244) | #F4F4F4 | Body bg, primary button text |
| `--foreground` | rgb(35, 35, 35) | #232323 | Body text, borders, dark buttons |
| `--accent-green` | rgb(207, 252, 143) | #CFFC8F | Hero CTA, accent panel, "Get updates" header btn, .in-line-label.green |
| `--accent-purple` | rgb(199, 184, 255) | #C7B8FF | Secondary chip pill, "Get updates" testimonials btn, .in-line-label.purple |
| `--surface-grey` | rgb(234, 233, 232) | #EAE9E8 | Testimonials panel bg |
| `--surface-light` | rgb(244, 244, 244) | #F4F4F4 | Section default bg |
| `--footer-bg` | rgb(35, 35, 35) | #232323 | Footer bg |

## Fonts
| Family | Use | Source |
|--------|-----|--------|
| Libre Baskerville | h1/h2 (serif headlines) | Google Fonts |
| Libre Franklin | h3 (sub-headings) | Google Fonts |
| Space Mono | chips/pills (uppercase) | Google Fonts |
| General Sans (Variable) | body, buttons, UI | Fontshare CDN |

## Type Scale
- **h1** (hero): Libre Baskerville 400 / 7.2rem (115.2px) / 100% line / -5px tracking
- **h2** (section heads): Libre Baskerville 400 / 2.6rem (41.6px) / 1.3 line / -2.08px tracking
- **h3** (column titles): Libre Franklin 400 / 2rem (32px) / 1.3 line / -1.6px tracking
- **body**: General Sans 500 / 1rem (16px) / 1.5 line / -0.32px tracking
- **chip/pill**: Space Mono 500 / 0.75rem (12px) / uppercase / -0.02px tracking

## Buttons
- All buttons: 1px solid #232323, 4px radius, 8px 20px padding, font 16px/14px line, weight 500
- **Lime CTA** (Plan your vote, Donate, Get updates header): bg #CFFC8F, text #232323
- **Purple CTA** (Get updates section, etc): bg #C7B8FF, text #232323
- **Dark CTA** (Submit, Send me my plan, Learn more): bg #232323, text #F4F4F4

## Layout
- Container max-width: 1280px
- Section vertical padding: 48px (`.section-padded`) and ~96px (`.padding-section-medium`)
- Body bg: #F4F4F4
