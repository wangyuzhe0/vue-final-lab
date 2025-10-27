<template>
  <header class="header">
    <div class="header-inner">
      <h1 style="margin:0;font-size:20px;">Social Anti-Fake News System</h1>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/news/new">Add News</RouterLink>
      </nav>
    </div>
  </header>
  <main class="container">
    <RouterView />
  </main>
</template>
<script setup>
// 无需脚本
</script>
<style scoped>
/* 局部样式可按需添加 */
</style>