<template>
  <section class="card" v-if="news">
    <header style="display:flex;justify-content:space-between;align-items:center;gap:12px;">
      <h2 style="margin:0;">{{ news.topic }}</h2>
      <span class="status" :class="statusClass(news.status)">{{ statusText(news.status) }}</span>
    </header>
    <p class="meta">Reporter: {{ news.reporter }} ｜ Reported at: {{ formatTime(news.reportedAt) }}</p>
    <img class="figure detail" :src="news.imageUrl" alt="Event Image"/>
    <p style="margin-top:12px;">{{ news.full }}</p>
    <p class="meta">
      Vote Stats:
      <span class="stat">Fake {{ news.fakeCount }} ({{ news.fakePct }}%)</span>
      <span class="stat">Not Fake {{ news.nonFakeCount }} ({{ news.nonFakePct }}%)</span>
    </p>
    <div class="row">
      <RouterLink class="ghost" :to="`/news/${id}/vote`">Vote/Comment</RouterLink>
      <RouterLink class="ghost" to="/">Back to Home</RouterLink>
    </div>
  </section>

  <section class="card">
    <h3 class="section-title">Comments & Votes (Paginated)</h3>
    <div v-if="totalComments === 0" class="meta">No comments yet. Be the first to vote.</div>
    <div v-else>
      <div class="grid">
        <article class="card" v-for="v in pagedComments" :key="v.id">
          <header style="display:flex;justify-content:space-between;align-items:center;gap:12px;">
            <h3 style="margin:0;font-size:18px;">{{ v.voter || 'Anonymous' }}</h3>
            <span class="status" :class="v.isFake ? 'bad' : 'ok'">{{ v.isFake ? 'Vote: Fake' : 'Vote: Not Fake' }}</span>
          </header>
          <p class="meta">Time: {{ formatTime(v.votedAt) }}</p>
          <p>{{ v.comment }}</p>
          <div v-if="v.imageUrl">
            <a :href="v.imageUrl" target="_blank" rel="noopener">
              <img class="figure comment" :src="v.imageUrl" alt="Evidence Image" />
            </a>
          </div>
        </article>
      </div>
      <Pagination :total="totalComments" v-model:page="page" :pageSize="pageSize" />
    </div>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useNewsStore } from '../stores/newsStore';
import Pagination from '../components/Pagination.vue';

const route = useRoute();
const id = Number(route.params.id);
const store = useNewsStore();

const news = computed(() => store.statsById(id));
const comments = computed(() => (store.byId(id)?.votes || []));
const page = ref(1);
const pageSize = ref(6);
const totalComments = computed(() => comments.value.length);

watch([comments, pageSize], () => { page.value = 1; });

const pagedComments = computed(() => {
  const start = (page.value - 1) * pageSize.value;
  return comments.value.slice(start, start + pageSize.value);
});

function formatTime(iso) {
  const d = new Date(iso);
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
}
function statusClass(s) { return s === 'fake' ? 'bad' : s === 'non-fake' ? 'ok' : 'pending'; }
function statusText(s) { return s === 'fake' ? 'Status: Fake' : s === 'non-fake' ? 'Status: Not Fake' : 'Pending'; }
</script>