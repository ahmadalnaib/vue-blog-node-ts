<script setup lang="ts">
import { TimelinePost } from '../posts';

defineProps<{ post: TimelinePost }>();
</script>

<template>
  <a class="flex flex-col items-start bg-white shadow-md mb-3 p-3 rounded-md">
    <a class="text-blue-700 ">{{ post.title }} </a>
    <div >{{ post.created.toFormat('d MMM') }}</div>
  </a>
</template>
