<script setup lang="ts">
import Timeline from '@/components/Timeline.vue';
</script>

<template>
  <div class="section"></div>
  <div class="container max-w-xl mx-auto m-5">
    <Suspense>
      <template #default>
        <Timeline />
      </template>
      <template #fallback>
        <div class="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
    <progress class="w-full h-full bg-blue-500" value="50" max="100"/>
  </div>
      </template>
    </Suspense>
 
  </div>
</template>

