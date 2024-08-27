<script setup lang="ts">

import TimelineItem from './TimelineItem.vue';
import { usePosts } from '../stores/posts';
import {periods} from '../constants'

const postsStore = usePosts();

await postsStore.fetchPosts();




</script>

<template>
  <nav class="bg-white shadow-md text-center py-4 mb-5">
    <span class="text-blue-500">
      <a
        class="mx-5"
        :class="{
          'bg-blue-100 text-blue-700 p-2 rounded-md': postsStore.selectedPeriod === period,
        }"
        v-for="period in periods"
        :key="period"
        @click="postsStore.setSelectedPeriod(period)"
        >{{ period }}</a
      >
    </span>
  </nav>
  <TimelineItem v-for="post in postsStore.filterdPosts" :key="post.title" :post="post" />
</template>
