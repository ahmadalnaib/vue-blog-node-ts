import express from 'express';
import cors from 'cors';
import {today,thisWeek,thisMonth} from '../posts';


const app=express();
app.use(cors());



app.get('/posts',(req,res)=>{
  // res.end('Hello World');
   res.json([today,thisWeek,thisMonth]);
});


app.listen(8000,()=>{
    console.log('Server is running on port 8000');
});