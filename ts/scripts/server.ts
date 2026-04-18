import express, { Request, Response } from 'express';
import path from 'path';
import { loadData } from './data.js';
import { lists } from "./user.js"

const app = express();
const port = 5500;

app.use('/css', express.static(path.join(__dirname, '../../css')));
app.use('/js', express.static(path.join(__dirname, '../../js')));

app.get('/user.html', (request: Request, response: Response) => {
    response.sendFile(path.join(`${__dirname}/../../html/`, 'user.html')); 
});

app.get('/', (request: Request, response: Response) => {
    response.sendFile(path.join(`${__dirname}/../../html/`, 'user.html')); 
});

app.get('/List/:id', (request: Request, response: Response) => {
    let listId = request.params.id as string;

    let listData = loadData(); //listData[listId];

    if (listData) {
        response.sendFile(path.join(__dirname, '../../html/', 'list.html'))
    } else {
        console.log(listData)
        response.status(404).send("<h1>404: List Not Found!</h1>");
    }
});

app.listen(port, () => {
    console.log(`Server is alive! Go to http://localhost:${port}/user.html`);
})