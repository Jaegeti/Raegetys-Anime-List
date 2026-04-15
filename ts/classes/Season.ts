import { Episode } from './Episode';

export class Season {
    title: string;
    episodes: Episode[] = [];
    rating: number | undefined;
    

    constructor(title: string = "New Season", episodeCount: number = 12, site: string = "crunchyroll", type: "episode"|"movie"|"special" = "episode") {
        this.title = title;
        this.rating = undefined;
        for (let i = 0; i < episodeCount; i++) {
            this.episodes.push(this.createEpisode(type, site));
        }
    }

    createEpisode(type: "episode" | "movie" | "special" = "episode", site: string = "crunchyroll"): Episode {
    return new Episode(type, site);
    }
}