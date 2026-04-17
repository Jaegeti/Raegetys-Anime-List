import { Entry } from "../classes/Entry.js";
import { Season } from "../classes/Season.js";
import { Episode } from "../classes/Episode.js";

const entries: Entry[] = [];
export let editMode = false;

function switchMode(button: HTMLButtonElement): void {
    editMode = !editMode;
    button.style.backgroundColor = (editMode) ? "green" : "initial";
}

function loadEntries(): void {      // to load entries from a file
    return;
}

export function createEntry(entry: Entry): void {
    entries.push(entry);

    const entryContainer = document.createElement("div");
    entryContainer.id = entry.mainTitle;
    entryContainer.className = "entryContainer";
    
    const headerContainer = document.createElement("div");
    headerContainer.className = "headerContainer";
    
    const entryTitle = document.createElement("h2");
    entryTitle.textContent = entry.mainTitle;
    headerContainer.appendChild(entryTitle);

    /*
      To add to headerContainer:
        Episode, Movie and Special progress
        Progress Bar
    */

    entryContainer.appendChild(headerContainer);

    for (let i = 0; i < entry.seasons.length; i++) {
    
        // Season Container including all Season Data
        const seasonContainer = document.createElement("div");
        seasonContainer.id = entry.seasons[i].title;
        seasonContainer.className = "seasonContainer";

        // Season Title Container including Title and Site
        const seasonTitleContainer = document.createElement("div");
        seasonTitleContainer.className = "seasonTitleContainer";

        // Season Title
        const seasonTitle = document.createElement("h3");
        seasonTitle.className = "seasonTitle";
        seasonTitle.textContent = entry.seasons[i].title;
        seasonTitleContainer.appendChild(seasonTitle);

        // Site
        const seasonSite = document.createElement("p");
        seasonSite.className = "seasonSite";
        seasonSite.textContent = entry.seasons[i].site;
        seasonTitleContainer.appendChild(seasonSite);

        seasonContainer.appendChild(seasonTitleContainer);

        // Episode Container including Episodes (and Movies/Specials)
        const episodesContainer = document.createElement("div");
        episodesContainer.className = "episodesContainer";
        for(let j = 0; j < entry.seasons[i].episodes.length; j++) {
            const episodeButton = document.createElement("button");
            episodeButton.className = "episodeButton";
            episodeButton.id = "episodeButton"+entry.seasons[i].episodes[j].type;
            episodeButton.textContent = String(entry.seasons[i].episodes[j].text);
            episodeButton.onclick = () => (editMode) ? switchEpisodeType(entry.seasons[i].episodes[j], episodeButton) : toggleEpisodeCompleted(entry.seasons[i].episodes[j], episodeButton);
            episodesContainer.appendChild(episodeButton);
        }
        seasonContainer.appendChild(episodesContainer);
        
        entryContainer.appendChild(seasonContainer);
    }
    
    document.body.appendChild(entryContainer);
}

function toggleEpisodeCompleted(episode: Episode, episodeButton: HTMLButtonElement): void {
    episodeButton.style.backgroundColor = (episode.toggleCompleted()) ? "green" : "initial"
}

function switchEpisodeType(episode: Episode, episodeButton: HTMLButtonElement): void {
    episode.switchType();
    episodeButton.id = (episodeButton.id == "episodeButtonEpisode") ? "episodeButtonMovie" : (episodeButton.id == "episodeButtonMovie") ? "episodeButtonSpecial" : "episodeButtonEpisode";
}

export function removeEntry(entry: Entry): void {

}

(window as any).switchMode = switchMode;