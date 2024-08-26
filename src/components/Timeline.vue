<script setup lang="ts">
import { ref } from 'vue';


const periods = ['Today', 'This week', 'This month'] as const;

type Period = typeof periods[number];

const selectedPeriod = ref<Period>('Today');
const selectPeriod = (period: Period) => {
  selectedPeriod.value = period;
};
</script>

<template>
  <nav class="bg-white shadow-md text-center py-4">
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
</template>
