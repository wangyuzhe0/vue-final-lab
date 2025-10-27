<template>
  <section class="card">
    <h2 style="margin:0 0 12px;">Add News</h2>

    <div class="grid">
      <div>
        <label class="label">Topic (required)</label>
        <input type="text" v-model="topic" placeholder="e.g., City water outage rumor"/>
      </div>
      <div>
        <label class="label">Reporter Name (required)</label>
        <input type="text" v-model="reporter" placeholder="e.g., Alice Zhang"/>
      </div>
    </div>

    <div style="margin-top:12px;">
      <label class="label">Summary (required)</label>
      <textarea rows="3" v-model="short" placeholder="Short description shown on list page"></textarea>
    </div>

    <div style="margin-top:12px;">
      <label class="label">Details (required)</label>
      <textarea rows="6" v-model="full" placeholder="Full content shown on detail page"></textarea>
    </div>

    <h3 class="section-title">Event Image (optional, local upload or URL)</h3>
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
      <img class="figure preview" :src="imageUrl" alt="Event image preview" />
    </div>
    <button class="ghost" v-if="imageUrl" @click="clearImage">Remove image</button>

    <div class="row" style="margin-top:12px;">
      <button :disabled="!canSubmit" @click="submit">Submit News</button>
      <RouterLink class="ghost" to="/">Back to Home</RouterLink>
    </div>

    <p v-if="error" style="color:var(--bad);margin-top:8px;">{{ error }}</p>
    <p v-if="ok" style="color:var(--ok);margin-top:8px;">Submitted successfully; added to list.</p>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useNewsStore } from '../stores/newsStore';

const store = useNewsStore();
const router = useRouter();

const topic = ref('');
const short = ref('');
const full = ref('');
const reporter = ref('');
const imageUrl = ref('');
const fileInputRef = ref(null);
const error = ref('');
const ok = ref(false);
const selectedFileName = ref('');
function onFileChange(e) {
  const file = e.target.files?.[0];
  if (!file) return;
  selectedFileName.value = file.name;
  const reader = new FileReader();
  reader.onload = () => { imageUrl.value = String(reader.result || ''); };
  reader.readAsDataURL(file);
}
function clearImage() {
  imageUrl.value = '';
  selectedFileName.value = '';
  if (fileInputRef.value) fileInputRef.value.value = '';
}

const showPreview = computed(() => {
  const u = imageUrl.value.trim();
  return u.startsWith('/') || u.startsWith('http://') || u.startsWith('https://') || u.startsWith('data:') || u.startsWith('blob:');
});

const canSubmit = computed(() =>
  topic.value.trim().length > 0 &&
  short.value.trim().length > 0 &&
  full.value.trim().length > 0 &&
  reporter.value.trim().length > 0
);

function submit() {
  error.value = '';
  ok.value = false;
  if (!canSubmit.value) {
    error.value = 'Please complete all required fields.';
    return;
  }
  store.addNews({
    topic: topic.value,
    short: short.value,
    full: full.value,
    reporter: reporter.value,
    imageUrl: imageUrl.value
  });
  ok.value = true;
  setTimeout(() => router.push('/'), 800);
}
</script>