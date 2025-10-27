import { defineStore } from 'pinia';
import { generateMockNews, computeStats } from '../mock/news';

export const useNewsStore = defineStore('news', {
  state: () => ({
    news: generateMockNews() // 刷新后会重新生成，新增评论会清空（符合题目要求）
  }),
  getters: {
    // 带统计字段的新闻
    newsWithStats: (state) => state.news.map(n => computeStats(n)),
    byId: (state) => (id) => state.news.find(n => n.id === Number(id)) || null,
    statsById: (state) => (id) => {
      const n = state.news.find(n => n.id === Number(id));
      return n ? computeStats(n) : null;
    }
  },
  actions: {
    addVote(newsId, { isFake, comment, imageUrl, voter = 'Anonymous' }) {
      const n = this.news.find(n => n.id === Number(newsId));
      if (!n) return;
      const v = {
        id: `${newsId}-${Date.now()}`,
        voter,
        isFake: !!isFake,
        comment: String(comment || '').trim(),
        imageUrl: String(imageUrl || '').trim(),
        votedAt: new Date().toISOString()
      };
      n.votes.unshift(v); // 新增评论靠前显示
    }, // 这里必须有逗号
    addNews(payload) {
      const id = this.news.reduce((m, n) => Math.max(m, Number(n.id)), 0) + 1;
      const reportedAt = payload.reportedAt || new Date().toISOString();
      const topic = String(payload.topic || '').trim();
      const short = String(payload.short || '').trim();
      const full = String(payload.full || '').trim();
      const reporter = String(payload.reporter || '').trim() || 'Anonymous Reporter';
      const imageUrl = String(payload.imageUrl || '').trim();
      if (!topic || !short || !full || !reporter) return;
      this.news.unshift({ id, topic, short, full, reporter, reportedAt, imageUrl, votes: [] });
    }
  }
});