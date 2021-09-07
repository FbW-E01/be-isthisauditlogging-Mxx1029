import express from 'express';
import { writeLog } from './setUpDB.js';

const app = express();

// this middleware function needs to call writeLog() only once and responds to all endpoints 
// with this you don't need to call writeLog() 4 times in each endpoint once :)
const myLog = (req, res, next) => {
    writeLog(req);
    next();
}

app.use(myLog)

app.get('/', (req, res) => {
    res.send("Request received via " + req.method + " on route " + req.path + "\n")
});

app.get('/content', (req, res) => {
    // writeLog(req);
    res.send("Request received via " + req.method + " on route " + req.path + "\n")
});

app.post('/sad', (req, res) => {
    // writeLog(req);
    res.send("Request received via " + req.method + " on route " + req.path + "\n")
});

app.post('/happy', (req, res) => {
    // writeLog(req);
    res.send("Request received via " + req.method + " on route " + req.path + "\n")
});

const port = 3020;
const callback = () => console.log("Server is started on http://localhost:" + port);
app.listen(port, callback);