import { defineStore } from 'pinia';
import {type Post, today, thisWeek, thisMonth } from "../posts";
import type { Period } from '@/constants';
import { DateTime } from 'luxon';


interface PostState{
  ids: string[];
  all: Map<string, Post>;
  selectedPeriod: Period;
}

function delay(){
  return new Promise((resolve)=>{
    setTimeout(resolve,1500);
  });
}



export const usePosts=defineStore('posts',{
  state:():PostState=>({
    ids:[],
    all:new Map(),
    selectedPeriod:"Today",
  }),
  actions:{
    setSelectedPeriod(period:Period){
      this.selectedPeriod=period;
    },
     async  fetchPosts(){
      const res=await fetch('http://localhost:8000/posts');
      const data=(await res.json()) as Post[];
      await delay();

      let ids:string[]=[];
      let all=new Map<string,Post>();
      for(const post of data){
        ids.push(post.id);
        all.set(post.id,post);
      }

      this.ids=ids;
      this.all=all;
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
