import { Season } from "./Season.js";
export class Entry {
    constructor(mainTitle = "New Entry", seasonsData = []) {
        this.totalEpisodes = {
            "total": 0,
            "episodes": 0,
            "movies": 0,
            "specials": 0
        };
        this.progress = {
            "total": 0,
            "episodes": 0,
            "movies": 0,
            "specials": 0
        };
        this.seasons = [];
        this.mainTitle = mainTitle;
        this.status = "ptw";
        this.rewatched = 0;
        for (let i = 0; i < this.seasons.length; i++) {
            for (let j = 0; j < this.seasons[i].episodes.length; j++) {
                this.totalEpisodes[this.seasons[i].episodes[j].type] += 1;
                this.totalEpisodes["total"] += 1;
            }
        }
        for (let i = 0; i < seasonsData.length; i++) {
            this.seasons.push(this.createSeason(seasonsData[i][0], seasonsData[i][1], seasonsData[i][2], seasonsData[i][3]));
        }
    }
    createSeason(title = "New Season", site = "crunchyroll", type = "episode", episodeCount = 12) {
        return new Season(title, site, type, episodeCount);
    }
}
