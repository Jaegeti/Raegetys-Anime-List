import express from 'express';
import path from 'path';
const app = express();
const port = 5500;
app.use('/ccs', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.get('/List/:id', (request, response) => {
    let listId = request.params.id;
    response.sendFile(path.join(__dirname, 'list.html'));
});
/*
interface AnimeEntry {
    title: string;
    score: number;
}

const animeDatabase: Record<string, AnimeEntry> = {
    "5114": { title: "Fullmetal Alchemist: Brotherhood", score: 9.1 },
    "21": { title: "One Piece", score: 8.7 },
    "11061": { title: "Hunter x Hunter", score: 9.0 }
};

app.get('/List/:id', (request: Request, response: Response) => {
    let listId = request.params.id as string;

    let listData = animeDatabase[listId];

    if (listData) {
        response.send(`
            <h1>${listData.title}</h1>
            <p>MAL Score: ${listData.score}</p>
        `);
    } else {
        response.status(404).send("<h1>404: Anime Not Found!</h1>");
    }
});
*/
app.listen(port, () => {
    console.log(`Server is alive! Go to http://localhost:${port}/user.html`);
});
