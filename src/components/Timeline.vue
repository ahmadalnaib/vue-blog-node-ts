<script setup lang="ts">
import { DateTime } from 'luxon';
import { ref } from 'vue';
import {Post,today,thisWeek,thisMonth} from '../posts'


const periods = ['Today', 'This week', 'This month'] as const;

type Period = typeof periods[number];

const selectedPeriod = ref<Period>('Today');
const selectPeriod = (period: Period) => {
  selectedPeriod.value = period;
};

const posts=[
  today,
  thisWeek,
  thisMonth
].map(post =>{
  return {
    ...post,
    created:DateTime.fromISO(post.created)
  }
})
</script>

<template>
  <nav class="bg-white shadow-md text-center py-4 mb-5">
    <span class="text-blue-500">
      <a
        class="mx-5"
         :class="{ 'bg-blue-100 text-blue-700 p-2 rounded-md': selectedPeriod === period }"
        v-for="period in periods"
        :key="period"
        @click="selectPeriod(period)"
        >{{ period }}</a
      >
    </span>
  </nav>
  <a class="flex"  v-for="post in posts" :key="post.id">
    <a class="text-blue-700 mx-3">{{ post.title }} </a>
  <div>{{ post.created.toFormat("d MMM") }}</div>
</a>
</template>
