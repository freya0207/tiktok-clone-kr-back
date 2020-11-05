import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';
import Data from './data.js';
import Videos from './dbModel.js'

// app config
const app = express();
const port = 9000;

// middlewares
app.use(Cors());
app.use(express.json());

// DB config
const connection_url = 'mongodb+srv://admin:911o16937@cluster0.7kwyq.mongodb.net/tiktok?retryWrites=true&w=majority'
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})


// api endpoints
app.get('/', (req, res) => {
    res.status(200).send("KKM is 천재");
});

app.get('/v1/posts', (req, res) => {
    res.status(200).send(Data);

});

app.post('/v2/posts', (req, res) => {

    // POST request is to ADD DATA to the database
    // It will let us ADD a video DOCUMENT to the videos COLLECTION
    const dbVideos = req.body

    Videos.create(dbVideos, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
})


// listen
app.listen(port, () => console.log(`we are listening at ${port}`))