import { Episode } from './Episode.js';

export class Season {
    title: string;
    site: string;
    rating: number | undefined;
    episodes: Episode[] = [];

    constructor(title: string = "New Season", site: string = "crunchyroll", type: "episode"|"movie"|"special" = "episode", episodeCount: number = 12) {
        this.title = title;
        this.site = site;
        this.rating = undefined;
        for (let i = 0; i < episodeCount; i++) {
            this.episodes.push(this.createEpisode(i+1, type, site));
        }
    }

    createEpisode(text: number | string = "", type: "episode" | "movie" | "special" = "episode", site: string = "crunchyroll"): Episode {
        return new Episode(text, type, site);
    }
}