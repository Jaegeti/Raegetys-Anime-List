import { Season } from "./Season.js";

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
 
    constructor(mainTitle: string = "New Entry", seasonsData: (string|number)[][] = []) {
        this.mainTitle = mainTitle;

        for (let i = 0; i < seasonsData.length; i++) {
            this.seasons.push(
                this.createSeason(seasonsData[i][0] as string,
                                  seasonsData[i][1] as number,
                                  seasonsData[i][2] as string,
                                  seasonsData[i][3] as "episode"|"movie"|"special")
            );
        }

        this.status = "ptw";
        for (let i = 0; i < this.seasons.length; i++) {
            for (let j = 0; j < this.seasons[i].episodes.length; j++) {
                this.totalEpisodes[this.seasons[i].episodes[j].type] += 1;
                this.totalEpisodes["total"] += 1;
            }
        }
        this.rewatched = 0;
        
    }

    createSeason(title: string = "New Season", episodeCount: number = 12, site: string = "crunchyroll", type: "episode"|"movie"|"special" = "episode"): Season {
        return new Season(title, episodeCount, site, type);
    }
}