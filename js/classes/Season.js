import { Episode } from './Episode.js';
export class Season {
    constructor(title = "New Season", episodeCount = 12, site = "crunchyroll", type = "episode") {
        this.episodes = [];
        this.title = title;
        for (let i = 0; i < episodeCount; i++) {
            this.episodes.push(this.createEpisode(type, site, i + 1));
        }
        this.site = site;
        this.rating = undefined;
    }
    createEpisode(type = "episode", site = "crunchyroll", text = "") {
        return new Episode(type, site, text);
    }
}
