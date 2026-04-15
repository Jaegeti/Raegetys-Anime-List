export class Episode {
    type: "episode" | "movie" | "special";
    completed: boolean;
    site: string;

    constructor(type: "episode" | "movie" | "special" = "episode", site: string = "crunchyroll") {
        this.type = type;
        this.completed = false;
        this.site = site;
    }
}