import express from 'express';
import { writeLog, outputLogs } from './setUpDB.js';

const app = express();

// this middleware function needs to call writeLog() only once and responds to all endpoints 
// with this you don't need to call writeLog() in each endpoint
const myLog = (req, res, next) => {
    writeLog(req);
    res.send("Request received via " + req.method + " on route " + req.path + "\n")
    // next();

    const duration = Math.round(Math.random() * 4000) + 1000;
    setTimeout(next, duration);
}

// make one exeption that doesn't use the myLog middleware
app.get('/', (req, res) => {
    const logsList = outputLogs();
    res.send(logsList.logs);
});

// use myLog for everything (except route GET "/" which is defined above)
app.use(myLog);

// you don't need them at all, as evrything happens in myLog
// app.get('/confused');
// you don't need the callback, as myLog is doing all what the endpoints need to do :)
// , (req, res) => {
    // writeLog(req);
    // res.send("Request received via " + req.method + " on route " + req.path + "\n")
// });
// app.get('/content');
// app.post('/sad');
// app.post('/happy');

const port = 3020;
const callback = () => console.log("Server is started on http://localhost:" + port);
app.listen(port, callback);