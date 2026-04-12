import { Episode } from './Episode';

export class Season {
    title: string;
    episodes: Episode[] = [];
    rating: number | undefined;
    

    constructor(title: string = "New Season", episodeCount: number = 12, site: string = "crunchyroll", type: "episode" | "movie" | "special" = "episode") {
        this.title = title
        this.rating = undefined
        for (let i = 0; i < episodeCount; i++) {
            this.episodes.push(new Episode(type, false, site));
        }
    }
}