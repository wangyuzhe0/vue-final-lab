<template>
  <section class="card">
    <div class="row" style="justify-content: space-between;">
      <div class="row">
        <span class="label">Filter:</span>
        <label><input type="radio" value="all" v-model="filter"/> All</label>
        <label><input type="radio" value="fake" v-model="filter"/> Fake News</label>
        <label><input type="radio" value="non-fake" v-model="filter"/> Not Fake News</label>
      </div>
      <div class="row" style="gap:8px;">
        <span class="label">Items per page:</span>
        <select v-model.number="pageSize">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="15">15</option>
          <option :value="20">20</option>
        </select>
        <RouterLink class="ghost" to="/news/new">Add News</RouterLink>
      </div>
    </div>
  </section>

  <section>
    <div class="grid">
      <article class="card" v-for="n in paged" :key="n.id">
        <header style="display:flex;justify-content:space-between;align-items:center;gap:12px;">
          <h3 style="margin:0;font-size:18px;">{{ n.topic }}</h3>
          <span class="status" :class="statusClass(n.status)">
            {{ statusText(n.status) }}
          </span>
        </header>
        <p class="meta">Reporter: {{ n.reporter }} ｜ Reported at: {{ formatTime(n.reportedAt) }}</p>
        <p>{{ n.short }}</p>
        <p class="meta">
          Votes: <span class="stat">Fake {{ n.fakeCount }} ({{ n.fakePct }}%)</span>
          <span class="stat">Not Fake {{ n.nonFakeCount }} ({{ n.nonFakePct }}%)</span>
        </p>
        <footer class="row">
          <RouterLink class="ghost" :to="`/news/${n.id}`">View Details</RouterLink>
          <RouterLink class="ghost" :to="`/news/${n.id}/vote`">Vote/Comment</RouterLink>
        </footer>
      </article>
    </div>
  </section>

  <section class="card">
    <Pagination :total="filtered.length" v-model:page="page" :pageSize="pageSize" />
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useNewsStore } from '../stores/newsStore';
import Pagination from '../components/Pagination.vue';

const store = useNewsStore();

const filter = ref('all'); // all | fake | non-fake
const pageSize = ref(10);
const page = ref(1);

watch([filter, pageSize], () => { page.value = 1; });

const filtered = computed(() => {
  const list = store.newsWithStats;
  if (filter.value === 'fake') return list.filter(n => n.status === 'fake');
  if (filter.value === 'non-fake') return list.filter(n => n.status === 'non-fake');
  return list;
});

const paged = computed(() => {
  const start = (page.value - 1) * pageSize.value;
  return filtered.value.slice(start, start + pageSize.value);
});

function formatTime(iso) {
  const d = new Date(iso);
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
}
function statusClass(s) {
  return s === 'fake' ? 'bad' : s === 'non-fake' ? 'ok' : 'pending';
}
function statusText(s) {
  return s === 'fake' ? 'Status: Fake' : s === 'non-fake' ? 'Status: Not Fake' : 'Pending';
}
</script>