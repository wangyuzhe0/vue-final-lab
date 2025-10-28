# Social Anti-Fake News System (Vue 3 + Vite)

## Team Info (fill as required)
- Team Name: `<uniqu>`
- Members:
  - Student ID: `<20232054>`, Name: `<wangyuzhe>`
  Contribution rate:40%
  - Student ID: `<20232081>`, Name: `<liuwenhao>`
  Contribution rate:30%
  - Student ID: `<20232097>`, Name: `<wangpengyue>`
  Contribution rate:30%
- Video link (2–3 min demo):<video controls src="the video.mp4" title="Title"></video>
'In the project'
- Live site URL (Vercel): `https://vue-final-lab-git-main-wangyuzhe0s-projects.vercel.app/`
`https://vue-final-lab.vercel.app/`
-The ppt is:[text](<template for presentation.pptx>)   'In the project'
- The address of the project in the class chartchai is:
https://github.com/chartchai-class/project-01-anti-fakenews-cn-unique
- The address of the project in my account is:
https://github.com/wangyuzhe0/vue-final-lab


## Features
- Home: news list, filter (All/Fake/Not Fake), items-per-page selection, pagination
- Detail: full news info (topic, body, status, reporter, time, image URL), vote stats, comment pagination
- Vote Page: standalone vote page, supports comment and image link (URL)
- Decision Rule: majority decides “Fake/Not Fake”; tie = “Pending”
- Storage: Pinia manages front-end state only; no server POST. Refresh clears newly added comments.

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

## Directory Structure
- `src/pages/Home.vue`: List, filter, pagination
- `src/pages/NewsDetail.vue`: Details, comments & vote stats, comment pagination
- `src/pages/Vote.vue`: Standalone vote page
- `src/stores/newsStore.js`: Pinia state and actions
- `src/mock/news.js`: Mock data and stats calculation
- `src/components/Pagination.vue`: Reusable pagination component
- `vercel.json`: Vercel deployment config