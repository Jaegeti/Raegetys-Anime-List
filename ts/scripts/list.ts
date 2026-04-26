import { List } from "../classes/List.js";
import { Entry } from "../classes/Entry.js";
import { Season } from "../classes/Season.js";
import { Episode } from "../classes/Episode.js";
import { lists } from "./user.js"
import { listIndex } from "./user.js"
import { fetchData } from "./user.js";

export let editMode = false;

console.log(listIndex);

const currentUrl = window.location.pathname;
const urlIdString = currentUrl.split('/').pop();
export const currentListId = Number(urlIdString);

async function initializeListPage() {   // Delete when createListsFromDict is done
    try {
        const response = await fetch('/api/get-lists');
        if (!response.ok) throw new Error("Failed to fetch data");

        const dataDict = await response.json();

        if (dataDict[currentListId]) {
            lists[currentListId] = {
                listTitle: dataDict[currentListId][Object.keys(dataDict[currentListId])[0]],
                entries: []
            } as any
        } else {
            console.error("The list ID from the URL doesn't exist in the database!");
        }
    } catch (error) {
        console.error("Error loading initial list data:", error);
    }
}

initializeListPage();

function switchMode(button: HTMLButtonElement): void {
    editMode = !editMode;
    button.style.backgroundColor = (editMode) ? "green" : "buttonface";
    
    if (editMode) { 
        const seasonTitles = document.getElementsByClassName("seasonTitle") as HTMLCollectionOf<HTMLHeadingElement>;
        for (let i = 0; i < seasonTitles.length; i++) {
            changeH3toInput(seasonTitles[i]);
        }
    } else {
        const seasonTitles = document.getElementsByClassName("seasonTitle") as HTMLCollectionOf<HTMLInputElement>;
        for (let i = 0; i < seasonTitles.length; i++) {
            changeInputtoH3(seasonTitles[i]);
        }
    }
}

export function createEntry(entry: Entry): void {
    //lists[listIndex].entries.push(entry);
    lists[currentListId].entries.push(entry); // +

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

    fetchData();
}

function toggleEpisodeCompleted(episode: Episode, episodeButton: HTMLButtonElement): void {
    episodeButton.style.backgroundColor = (episode.toggleCompleted()) ? "green" : "buttonface"
}

function switchEpisodeType(episode: Episode, episodeButton: HTMLButtonElement): void {
    episode.switchType();
    episodeButton.id = (episodeButton.id == "episodeButtonEpisode") ? "episodeButtonMovie" : (episodeButton.id == "episodeButtonMovie") ? "episodeButtonSpecial" : "episodeButtonEpisode";
}

export function removeEntry(entry: Entry): void {

}

function changeH3toInput(h3Element: HTMLHeadingElement) {
    const inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.className = h3Element.className;
    inputElement.value = h3Element.textContent;

    h3Element.replaceWith(inputElement);
}

function changeInputtoH3(inputElement: HTMLInputElement) {
    const h3Element = document.createElement("h3");
    h3Element.className = inputElement.className;
    h3Element.textContent = inputElement.value;

    inputElement.replaceWith(h3Element);
}

function loadData(): void {      // to load entries from a file
    return;
}

(window as any).switchMode = switchMode;