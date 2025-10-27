<template>
  <div class="pagination" v-if="pages > 1">
    <button class="ghost" :disabled="page===1" @click="$emit('update:page', 1)">First</button>
    <button class="ghost" :disabled="page===1" @click="$emit('update:page', page-1)">Prev</button>
    <span class="label">Page {{ page }} / {{ pages }}</span>
    <button class="ghost" :disabled="page===pages" @click="$emit('update:page', page+1)">Next</button>
    <button class="ghost" :disabled="page===pages" @click="$emit('update:page', pages)">Last</button>
  </div>
</template>
<script setup>
import { computed } from 'vue';
const props = defineProps({
  total: { type: Number, required: true },
  page: { type: Number, required: true },
  pageSize: { type: Number, required: true }
});
const pages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)));
</script>