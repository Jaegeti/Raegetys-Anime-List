import { Episode } from './Episode.js';
export class Season {
    constructor(title = "New Season", site = "crunchyroll", type = "episode", episodeCount = 12) {
        this.episodes = [];
        this.title = title;
        this.site = site;
        this.rating = undefined;
        for (let i = 0; i < episodeCount; i++) {
            this.episodes.push(this.createEpisode(i + 1, type, site));
        }
    }
    createEpisode(text = "", type = "episode", site = "crunchyroll") {
        return new Episode(text, type, site);
    }
}
