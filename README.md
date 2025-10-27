# Social Anti-Fake News System (Vue 3 + Vite)

This project is a course assignment demo: users can submit news, the community votes to determine whether it is fake, and explains reasons via comments. Majority votes decide “Fake/Not Fake”; comments and votes are saved only in front-end state (cleared on refresh), meeting the “simple SPA” requirement.

## Features
- Home: news list, filter (All/Fake/Not Fake), items-per-page selection, pagination
- Detail: full news info (topic, body, status, reporter, time, image URL), vote stats, comment pagination
- Vote Page: standalone vote page, supports comment and image link (URL)
- Decision Rule: majority decides “Fake/Not Fake”; tie = “Pending”
- Storage: Pinia manages front-end state only; no server POST. Refresh clears newly added comments.
- Mock Data: auto-generates 30 news items and multiple comments to ensure pagination

## Tech Stack
- Vue 3 + Vite
- Vue Router
- Pinia (front-end state management)
- Vercel static deployment

## Local Development
```bash
npm i
```

```bash
npm run dev
```

## Build & Preview
```bash
npm run build
```

```bash
npm run preview
```

## Deploy to Vercel
- Push the repo to GitHub, then import it in Vercel. Choose **Vite** or use the default `vercel.json` in this repo.
- Build command: `npm run build`, output directory: `dist`.
- CLI option:
  ```bash
  vercel --prod
  ```
  (Requires local `vercel` installed and logged in)

## Team Info (fill as required)
- Team Name: `<your team>`
- Members:
  - Student ID: `<id1>`, Name: `<name1>`
  - Student ID: `<id2>`, Name: `<name2>`
  - Student ID: `<id3>`, Name: `<name3>`
- Video link (2–3 min demo): `<paste your video URL>`
- Live site URL (Vercel): `<paste your production URL>`

> Note: Please create/join your team in the course system and ensure this README is complete before final submission.

## Directory Structure
- `src/pages/Home.vue`: List, filter, pagination
- `src/pages/NewsDetail.vue`: Details, comments & vote stats, comment pagination
- `src/pages/Vote.vue`: Standalone vote page
- `src/stores/newsStore.js`: Pinia state and actions
- `src/mock/news.js`: Mock data and stats calculation
- `src/components/Pagination.vue`: Reusable pagination component
- `vercel.json`: Vercel deployment config