import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import('../pages/Home.vue');
const NewsDetail = () => import('../pages/NewsDetail.vue');
const Vote = () => import('../pages/Vote.vue');
const AddNews = () => import('../pages/AddNews.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/news/new', name: 'news-new', component: AddNews },
    { path: '/news/:id', name: 'news-detail', component: NewsDetail, props: true },
    { path: '/news/:id/vote', name: 'vote', component: Vote, props: true },
  ],
  scrollBehavior() { return { top: 0 }; }
});

export default router;