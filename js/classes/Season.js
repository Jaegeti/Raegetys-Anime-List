"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Season = void 0;
const Episode_1 = require("./Episode");
class Season {
    constructor(title = "New Season", episodeCount = 12, site = "crunchyroll", type = "episode") {
        this.episodes = [];
        this.title = title;
        this.rating = undefined;
        for (let i = 0; i < episodeCount; i++) {
            this.episodes.push(new Episode_1.Episode(type, false, site));
        }
    }
}
exports.Season = Season;
