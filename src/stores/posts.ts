import { defineStore } from 'pinia';
import {type Post, today, thisWeek, thisMonth } from "../posts";
import type { Period } from '@/constants';
import { DateTime } from 'luxon';


interface PostState{
  ids: string[];
  all: Map<string, Post>;
  selectedPeriod: Period;
}



export const usePosts=defineStore('posts',{
  state:():PostState=>({
    ids:[today.id,thisWeek.id,thisMonth.id],
    all:new Map([
      [today.id,today],
      [thisWeek.id,thisWeek],
      [thisMonth.id,thisMonth],
    
    ]),
    selectedPeriod:"Today",
  }),
  actions:{
    setSelectedPeriod(period:Period){
      this.selectedPeriod=period;
    }
  },

  getters:{
    filterdPosts: (state): TimelinePost[] => {
        return state.ids
          .map((id) => {
            const post = state.all.get(id);
            if (!post) {
              throw new Error(`Post with id ${id} not found`);
            }
            return {
              ...post,
              created: DateTime.fromISO(post.created),
            };
          })
          .filter((post) => {
            if (state.selectedPeriod === 'Today') {
              return post.created >= DateTime.now().minus({ days: 1 });
            }
            if (state.selectedPeriod === 'This week') {
              return post.created >= DateTime.now().minus({ week: 1 });
            }
            return post;
          });
      
    
  }
}
  

})
