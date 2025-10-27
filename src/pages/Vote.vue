<template>
  <section class="card" v-if="news">
    <h2 style="margin:0 0 12px;">Vote and comment on “{{ news.topic }}”</h2>
    <p class="meta">Reporter: {{ news.reporter }} ｜ Reported at: {{ formatTime(news.reportedAt) }}</p>
    <img class="figure" :src="news.imageUrl" alt="Event Image"/>
  </section>

  <section class="card" v-if="news">
    <h3 class="section-title">Vote (required)</h3>
    <div class="row">
      <label><input type="radio" value="fake" v-model="voteChoice"> Fake News</label>
      <label><input type="radio" value="non-fake" v-model="voteChoice"> Not Fake News</label>
    </div>

    <h3 class="section-title">Comment (required)</h3>
    <textarea rows="5" v-model="comment" placeholder="Please explain your reasoning (required)"></textarea>

    <h3 class="section-title">Evidence Image (optional, upload or URL)</h3>
    <div class="grid">
      <div>
        <input type="file" accept="image/*" ref="fileInputRef" @change="onFileChange" style="display:none" />
        <button class="ghost" type="button" @click="fileInputRef?.click()">Choose Image</button>
        <div class="meta" v-if="selectedFileName">Selected: {{ selectedFileName }}</div>
      </div>
      <div>
        <input type="url" v-model="imageUrl" placeholder="Or provide image URL, e.g., https://..." />
      </div>
    </div>
    <div v-if="showPreview" class="meta">
      <a :href="imageUrl" target="_blank" rel="noopener">Open original</a>
      <img class="figure preview" :src="imageUrl" alt="Preview Image" />
    </div>
    <button class="ghost" v-if="imageUrl" @click="clearImage">Remove image</button>

    <h3 class="section-title">Your nickname (optional)</h3>
    <input type="text" v-model="voter" placeholder="Anonymous"/>

    <div class="row" style="margin-top:12px;">
      <button :disabled="!canSubmit" @click="submit">Submit</button>
      <RouterLink class="ghost" :to="`/news/${id}`">Back to Details</RouterLink>
    </div>

    <p v-if="error" style="color:var(--bad);margin-top:8px;">{{ error }}</p>
    <p v-if="ok" style="color:var(--ok);margin-top:8px;">Submitted successfully; added to comment list.</p>
  </section>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNewsStore } from '../stores/newsStore';

const route = useRoute();
const router = useRouter();
const id = Number(route.params.id);
const store = useNewsStore();
const news = computed(() => store.statsById(id));

const voteChoice = ref('');
const comment = ref('');
const imageUrl = ref('');
const voter = ref('');
const error = ref('');
const ok = ref(false);

const canSubmit = computed(() =>
  (voteChoice.value === 'fake' || voteChoice.value === 'non-fake') &&
  comment.value.trim().length > 0
);

const fileInputRef = ref(null);
const selectedFileName = ref('');
function onFileChange(e) {
  const file = e.target.files?.[0];
  if (!file) return;
  selectedFileName.value = file.name;
  const reader = new FileReader();
  reader.onload = () => {
    // 将本地图片转为 data URL 存到 imageUrl，提交后可在详情页展示
    imageUrl.value = String(reader.result || '');
  };
  reader.readAsDataURL(file);
}
function clearImage() {
  imageUrl.value = '';
  selectedFileName.value = '';
  if (fileInputRef.value) fileInputRef.value.value = '';
}

const showPreview = computed(() => {
  const url = imageUrl.value.trim();
  return url.startsWith('/') || url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:') || url.startsWith('blob:');
});

function submit() {
  error.value = '';
  ok.value = false;
  if (!canSubmit.value) {
    error.value = 'Please complete the vote and enter a comment.';
    return;
  }
  store.addVote(id, {
    isFake: voteChoice.value === 'fake',
    comment: comment.value,
    imageUrl: imageUrl.value,
    voter: voter.value || 'Anonymous'
  });
  ok.value = true;
  // 可选：短暂停留后跳转回详情
  setTimeout(() => router.push(`/news/${id}`), 800);
}

function formatTime(iso) {
  const d = new Date(iso);
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
}
</script>