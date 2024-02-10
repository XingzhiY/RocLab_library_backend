import express from "express"
import { PORT,mongoDBURL } from './config.js';
import mongoose from 'mongoose';

const app = express();



app.listen(PORT,()=>{
    console.log(`App is l;istening to port: ${PORT}`)
})
mongoose
    .connect(mongoDBURL)
    .then((request,response)=>{
        console.log('connect to mongoDB successfullly')

        app.get('/', (request, response) => {
            console.log(request);
            return response.status(234).send('Welcome To MERN Stack Tutorial');
          });
    })
    .catch((error)=>{
        console.log(error)
    })