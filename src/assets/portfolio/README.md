# Portfolio media

Drop real Famysys Studio work here, organized by category, then wire it into
`src/data/content.js` (`portfolioCategories[].media`):

- `ai-video/` — image poster frame (.jpg/.png) + video (.mp4)
- `print-design/` — banners, catalogues, posters (.jpg/.png)
- `explainer/` — poster frame + video (.mp4)
- `ugc/` — poster frame + video (.mp4)

`PortfolioMedia` (src/components/PortfolioMedia.jsx) accepts `{ type: 'image' | 'video', src, poster }`
and handles lazy loading automatically. Until media is added, the Selected
Work slide renders a typography-led placeholder for each category instead of
a fabricated image.
