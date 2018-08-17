import express from 'express';
import bodyParser from 'body-parser';
import { configureRoutes, configureOpenRoutes } from './api/routes';
import Auth from './api/middlewares/auth';
import allowCors from './api/middlewares/cors';
import { start } from './api/database';
import io from 'socketio';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const protectedApi = express.Router();
protectedApi.use(Auth)
configureRoutes(protectedApi);

const openApi = express.Router();
configureOpenRoutes(openApi);

app.use(allowCors);
app.use('/api', protectedApi);
app.use('/oapi', openApi);

//start();

app.listen(port);

console.log('API is up and running on port ' + port);

io.on('connection', (socket) => {
    socket.on('score-updated', (data) => {
        socket.broadcast.emit('score-update', {
            data: data
        })
    });
});