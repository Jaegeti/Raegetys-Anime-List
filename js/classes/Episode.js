export class Episode {
    constructor(type = "episode", site = "crunchyroll", text = "") {
        this.type = type;
        this.completed = false;
        this.site = site;
        this.text = text;
    }
    toggleCompleted() {
        this.completed = !this.completed;
        return this.completed;
    }
    switchType() {
        this.type = (this.type == "episode") ? "movie" : (this.type == "movie") ? "special" : "episode";
    }
}
