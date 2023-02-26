import express from 'express';
import {mainRouter} from './routes/main.js'

const PORT= 5555;

const app= express();
app.use(express.json());

//routes 
app.use(mainRouter);

//server -start ou listen

app.listen(PORT, ( ) => {

    console.log(`[SERVER] Server is running on port ${PORT}`);
});