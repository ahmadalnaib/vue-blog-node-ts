import { defineStore } from 'pinia';

interface PostState{
  foo:string;
}



export const usePosts=defineStore('posts',{
  state:():PostState=>({
    foo:'bar'
  }),
  actions:{
    updateFoo(foo:string){
      this.foo=foo;
    }
  }
  

})
