import { Season } from "./Season.js";

export class Entry {
    mainTitle: string;
    status: "ptw" | "watching" | "completed" | "dropped" | "on hold" | "rewatching";
    rewatched: number;
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
    seasons: Season[] = [];
 
    constructor(mainTitle: string = "New Entry", seasonsData: (string|number)[][] = []) {
        this.mainTitle = mainTitle;
        this.status = "ptw";
        this.rewatched = 0;
        for (let i = 0; i < seasonsData.length; i++) {
            this.seasons.push(
                this.createSeason(seasonsData[i][0] as string,
                                  seasonsData[i][1] as string,
                                  seasonsData[i][2] as "episode"|"movie"|"special",
                                  seasonsData[i][3] as number)
            );
        }
        for (let i = 0; i < this.seasons.length; i++) {
            for (let j = 0; j < this.seasons[i].episodes.length; j++) {
                this.totalEpisodes[this.seasons[i].episodes[j].type+"s"] += 1;
                this.totalEpisodes["total"] += 1;
            }
        }
    }

    createSeason(title: string = "New Season", site: string = "crunchyroll", type: "episode"|"movie"|"special" = "episode", episodeCount: number = 12): Season {
        return new Season(title, site, type, episodeCount);
    }

    updateSeasonLength() {
        
    }

    updateProgress() {

    }
}