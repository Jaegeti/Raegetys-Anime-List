export class Episode {
    type: "episode" | "movie" | "special";
    completed: boolean;
    site: string;

    constructor(type: "episode" | "movie" | "special" = "episode", completed: boolean = false, site: string = "crunchyroll") {
        this.type = type;
        this.completed = completed;
        this.site = site;
    }
}