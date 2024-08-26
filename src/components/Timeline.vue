<script setup lang="ts">
import { ref } from 'vue';
const periods = ref(['Today', 'This week', 'This month']);

const selectedPeriod = ref('Today');
const selectPeriod = (period: string) => {
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
