"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entry = void 0;
class Entry {
    constructor(mainTitle = "New Entry", seasons = []) {
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
        this.seasons = seasons;
        this.status = "ptw";
        for (let i = 0; i < this.seasons.length; i++) {
            for (let j = 0; j < this.seasons[i].episodes.length; j++) {
                this.totalEpisodes[this.seasons[i].episodes[j].type] += 1;
                this.totalEpisodes["total"] += 1;
            }
        }
        this.rewatched = 0;
    }
}
exports.Entry = Entry;
