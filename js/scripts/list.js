import { lists } from "./user.js";
import { listIndex } from "./user.js";
export let editMode = false;
console.log(listIndex);
const currentUrl = window.location.pathname;
const urlIdString = currentUrl.split('/').pop();
export const currentListId = Number(urlIdString);
function switchMode(button) {
    editMode = !editMode;
    button.style.backgroundColor = (editMode) ? "green" : "buttonface";
    if (editMode) {
        const seasonTitles = document.getElementsByClassName("seasonTitle");
        for (let i = 0; i < seasonTitles.length; i++) {
            changeH3toInput(seasonTitles[i]);
        }
    }
    else {
        const seasonTitles = document.getElementsByClassName("seasonTitle");
        for (let i = 0; i < seasonTitles.length; i++) {
            changeInputtoH3(seasonTitles[i]);
        }
    }
}
export function createEntry(entry) {
    //lists[listIndex].entries.push(entry);
    console.log(lists);
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
        for (let j = 0; j < entry.seasons[i].episodes.length; j++) {
            const episodeButton = document.createElement("button");
            episodeButton.className = "episodeButton";
            episodeButton.id = "episodeButton" + entry.seasons[i].episodes[j].type;
            episodeButton.textContent = String(entry.seasons[i].episodes[j].text);
            episodeButton.onclick = () => (editMode) ? switchEpisodeType(entry.seasons[i].episodes[j], episodeButton) : toggleEpisodeCompleted(entry.seasons[i].episodes[j], episodeButton);
            episodesContainer.appendChild(episodeButton);
        }
        seasonContainer.appendChild(episodesContainer);
        entryContainer.appendChild(seasonContainer);
    }
    document.body.appendChild(entryContainer);
}
function toggleEpisodeCompleted(episode, episodeButton) {
    episodeButton.style.backgroundColor = (episode.toggleCompleted()) ? "green" : "buttonface";
}
function switchEpisodeType(episode, episodeButton) {
    episode.switchType();
    episodeButton.id = (episodeButton.id == "episodeButtonEpisode") ? "episodeButtonMovie" : (episodeButton.id == "episodeButtonMovie") ? "episodeButtonSpecial" : "episodeButtonEpisode";
}
export function removeEntry(entry) {
}
function changeH3toInput(h3Element) {
    const inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.className = h3Element.className;
    inputElement.value = h3Element.textContent;
    h3Element.replaceWith(inputElement);
}
function changeInputtoH3(inputElement) {
    const h3Element = document.createElement("h3");
    h3Element.className = inputElement.className;
    h3Element.textContent = inputElement.value;
    inputElement.replaceWith(h3Element);
}
function saveData(lists) {
    const dataDict = {};
    for (let i = 0; i < lists.length; i++) {
        dataDict[i][lists[i].listTitle] = lists[i].listTitle;
        for (let j = 0; j < lists[i].entries.length; j++) {
            dataDict[i][j][lists[i].entries[j].mainTitle] = lists[i].entries[j].mainTitle;
            dataDict[i][j]["status"] = lists[i].entries[j].status;
            dataDict[i][j]["rewatched"] = lists[i].entries[j].rewatched;
            dataDict[i][j]["totalEpisodes"] = lists[i].entries[j].totalEpisodes;
            dataDict[i][j]["progress"] = lists[i].entries[j].progress;
            for (let k = 0; k < lists[i].entries[j].seasons.length; k++) {
                dataDict[i][j]["seasons"][k]["title"] = lists[i].entries[j].seasons[k].title;
                dataDict[i][j]["seasons"][k]["site"] = lists[i].entries[j].seasons[k].site;
                dataDict[i][j]["seasons"][k]["rating"] = lists[i].entries[j].seasons[k].rating;
                for (let l = 0; l < lists[i].entries[j].seasons[k].episodes.length; l++) {
                    dataDict[i][j]["seasons"][k]["episodes"][l]["text"] = lists[i].entries[j].seasons[k].episodes[l].text;
                    dataDict[i][j]["seasons"][k]["episodes"][l]["completed"] = lists[i].entries[j].seasons[k].episodes[l].completed;
                    dataDict[i][j]["seasons"][k]["episodes"][l]["type"] = lists[i].entries[j].seasons[k].episodes[l].type;
                    dataDict[i][j]["seasons"][k]["episodes"][l]["site"] = lists[i].entries[j].seasons[k].episodes[l].site;
                }
            }
        }
    }
}
function loadData() {
    return;
}
window.switchMode = switchMode;
