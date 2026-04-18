export class Episode {
    text: number | string;
    completed: boolean;
    type: "episode" | "movie" | "special";
    site: string;

    constructor(text: number | string = "", type: "episode" | "movie" | "special" = "episode", site: string = "crunchyroll") {
        this.text = text;
        this.completed = false;
        this.type = type;
        this.site = site;
    }

    toggleCompleted(): boolean {
        this.completed = !this.completed;
        return this.completed;
    }

    switchType(): void {
        this.type = (this.type == "episode") ? "movie" : (this.type == "movie") ? "special" : "episode";
    }
}