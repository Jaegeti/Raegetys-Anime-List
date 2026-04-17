export class Episode {
    type: "episode" | "movie" | "special";
    completed: boolean;
    site: string;
    text: number | string;

    constructor(type: "episode" | "movie" | "special" = "episode", site: string = "crunchyroll", text: number | string = "") {
        this.type = type;
        this.completed = false;
        this.site = site;
        this.text = text;
    }

    toggleCompleted(): boolean {
        this.completed = !this.completed;
        return this.completed;
    }

    switchType(): void {
        this.type = (this.type == "episode") ? "movie" : (this.type == "movie") ? "special" : "episode";
    }
}