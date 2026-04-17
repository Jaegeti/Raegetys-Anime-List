import { Episode } from './Episode.js';

export class Season {
    title: string;
    episodes: Episode[] = [];
    site: string;
    rating: number | undefined;

    constructor(title: string = "New Season", episodeCount: number = 12, site: string = "crunchyroll", type: "episode"|"movie"|"special" = "episode") {
        this.title = title;
        
        for (let i = 0; i < episodeCount; i++) {
            this.episodes.push(this.createEpisode(type, site, i+1));
        }
        this.site = site;
        this.rating = undefined;
    }

    createEpisode(type: "episode" | "movie" | "special" = "episode", site: string = "crunchyroll", text: number | string = ""): Episode {
    return new Episode(type, site, text);
    }
}