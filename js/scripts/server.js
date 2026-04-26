import express from 'express';
import path from 'path';
import { loadData } from './data.js';
import { saveData } from './data.js';
const app = express();
const port = 5500;
app.use(express.json());
app.use('/css', express.static(path.join(__dirname, '../../css')));
app.use('/js', express.static(path.join(__dirname, '../../js')));
app.get('/user.html', (request, response) => {
    response.sendFile(path.join(`${__dirname}/../../html/`, 'user.html'));
});
app.get('/', (request, response) => {
    response.sendFile(path.join(`${__dirname}/../../html/`, 'user.html'));
});
app.get('/list/:id', (request, response) => {
    let listId = request.params.id;
    console.log("loaded!");
    let listData = loadData(); //listData[listId];
    if (listData) {
        response.sendFile(path.join(__dirname, '../../html/', 'list.html'));
    }
    else {
        console.log(listData);
        response.status(404).send("<h1>404: List Not Found!</h1>");
    }
});
app.get('/api/get-lists', (request, response) => {
    const loadedData = loadData();
    response.json(loadedData);
});
app.listen(port, () => {
    console.log(`Server is alive! Go to http://localhost:${port}/user.html`);
});
app.post('/api/save-lists', (request, response) => {
    const listsDataFromFrontend = request.body;
    saveData(listsDataFromFrontend);
    response.send("Data saved successfully!");
});
