"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Episode = void 0;
class Episode {
    constructor(type = "episode", site = "crunchyroll") {
        this.type = type;
        this.completed = false;
        this.site = site;
    }
}
exports.Episode = Episode;
