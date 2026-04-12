import { Season } from "./Season";

export class Entry {
    mainTitle: string;
    seasons: Season[] = [];
    status: "ptw" | "watching" | "completed" | "dropped" | "on hold" | "rewatching";
    totalEpisodes: { [id: string]: number; } = {
        "total": 0,
        "episodes": 0,
        "movies": 0,
        "specials": 0
    };
    progress: { [id: string]: number; } = {
        "total": 0,
        "episodes": 0,
        "movies": 0,
        "specials": 0
    };
    rewatched: number;
 
    constructor(mainTitle: string = "New Entry", seasons: Season[] = []) {
        this.mainTitle = mainTitle;
        this.seasons = seasons;
        this.status = "ptw";
        for (let i = 0; i < this.seasons.length; i++) {
            for (let j = 0; j < this.seasons[i].episodes.length; j++) {
                this.totalEpisodes[this.seasons[i].episodes[j].type] += 1
                this.totalEpisodes["total"] += 1
            }
        }
        this.rewatched = 0;
        
    }
}