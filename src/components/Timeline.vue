<script setup lang="ts">
import { DateTime } from 'luxon';
import { ref, computed } from 'vue';
import { TimelinePost, today, thisWeek, thisMonth } from '../posts';
import TimelineItem from './TimelineItem.vue';
import { usePosts } from '../stores/posts';

const postsStore = usePosts();

const periods = ['Today', 'This week', 'This month'] as const;

type Period = (typeof periods)[number];

const selectedPeriod = ref<Period>('Today');
const selectPeriod = (period: Period) => {
  selectedPeriod.value = period;
};

const posts = computed<TimelinePost[]>(() => {
  return postsStore.ids
    .map((id) => {
      const post = postsStore.all.get(id);
      if (!post) {
        throw new Error(`Post with id ${id} not found`);
      }
      return {
        ...post,
        created: DateTime.fromISO(post.created),
      };
    })
    .filter((post) => {
      if (selectedPeriod.value === 'Today') {
        return post.created >= DateTime.now().minus({ days: 1 });
      }
      if (selectedPeriod.value === 'This week') {
        return post.created >= DateTime.now().minus({ week: 1 });
      }
      return post;
    });
});
</script>

<template>
  <nav class="bg-white shadow-md text-center py-4 mb-5">
    <span class="text-blue-500">
      <a
        class="mx-5"
        :class="{
          'bg-blue-100 text-blue-700 p-2 rounded-md': selectedPeriod === period,
        }"
        v-for="period in periods"
        :key="period"
        @click="selectPeriod(period)"
        >{{ period }}</a
      >
    </span>
  </nav>
  <TimelineItem v-for="post in posts" :key="post.title" :post="post" />
</template>
