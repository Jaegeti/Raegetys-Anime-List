export class Episode {
    constructor(text = "", type = "episode", site = "crunchyroll") {
        this.text = text;
        this.completed = false;
        this.type = type;
        this.site = site;
    }
    toggleCompleted() {
        this.completed = !this.completed;
        return this.completed;
    }
    switchType() {
        this.type = (this.type == "episode") ? "movie" : (this.type == "movie") ? "special" : "episode";
    }
}
