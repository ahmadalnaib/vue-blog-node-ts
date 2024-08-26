import { defineStore } from 'pinia';
import {type Post, today, thisWeek, thisMonth } from "../posts";


interface PostState{
  ids: string[];
  all: Map<string, Post>;
}



export const usePosts=defineStore('posts',{
  state:():PostState=>({
    ids:[today.id,thisWeek.id,thisMonth.id],
    all:new Map([
      [today.id,today],
      [thisWeek.id,thisWeek],
      [thisMonth.id,thisMonth],
    ])
  }),
  actions:{
  }
  

})
