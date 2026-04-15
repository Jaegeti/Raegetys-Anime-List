"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entry = void 0;
const Season_1 = require("./Season");
class Entry {
    constructor(mainTitle = "New Entry", seasonsData = []) {
        this.seasons = [];
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
        this.mainTitle = mainTitle;
        for (let i = 0; i < seasonsData.length; i++) {
            this.seasons.push(this.createSeason(seasonsData[i][0], seasonsData[i][1], seasonsData[i][2], seasonsData[i][3]));
        }
        this.status = "ptw";
        for (let i = 0; i < this.seasons.length; i++) {
            for (let j = 0; j < this.seasons[i].episodes.length; j++) {
                this.totalEpisodes[this.seasons[i].episodes[j].type] += 1;
                this.totalEpisodes["total"] += 1;
            }
        }
        this.rewatched = 0;
    }
    createSeason(title = "New Season", episodeCount = 12, site = "crunchyroll", type = "episode") {
        return new Season_1.Season(title, episodeCount, site, type);
    }
}
exports.Entry = Entry;
