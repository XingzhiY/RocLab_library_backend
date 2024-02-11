import express from "express"
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import router from "./routes/booksRoute.js";

const app = express();
app.use(express.json());
app.use("/books",router)

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome To Andy\'s library');
});



mongoose
    .connect(mongoDBURL)
    .then((request, response) => {
        // console.log('connect to mongoDB successfullly')
        app.listen(PORT, () => {
            console.log(`App is l;istening to port: ${PORT}`)
        })

    })
    .catch((error) => {
        console.log(error)
    })