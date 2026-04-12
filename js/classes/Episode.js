"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Episode = void 0;
class Episode {
    constructor(type = "episode", completed = false, site = "crunchyroll") {
        this.type = type;
        this.completed = completed;
        this.site = site;
    }
}
exports.Episode = Episode;
