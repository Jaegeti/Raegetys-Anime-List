import { Entry } from "../classes/Entry.js";
import { createEntry } from "./list.js";
function openAddMenu() {
    const addMenuContainer = document.createElement("div");
    addMenuContainer.id = "addMenu"; // Div
    const header = document.createElement("div");
    header.id = "addMenuHeader";
    const containerTitle = document.createElement("h2");
    containerTitle.textContent = "Add Entry";
    header.appendChild(containerTitle);
    const exitButton = document.createElement("button");
    exitButton.id = "addMenuExitButton";
    exitButton.textContent = "X";
    exitButton.onclick = () => addMenuContainer.remove();
    header.appendChild(exitButton);
    addMenuContainer.appendChild(header);
    const entryTitle = document.createElement("input");
    entryTitle.id = "addMenuEntryTitle";
    entryTitle.type = "text";
    entryTitle.placeholder = "Enter Entry Title";
    addMenuContainer.appendChild(entryTitle);
    const seasonContainerButton = document.createElement("button");
    seasonContainerButton.textContent = "[+]";
    seasonContainerButton.onclick = () => seasonContainerContainer.appendChild(createSeasonContainer());
    addMenuContainer.appendChild(seasonContainerButton);
    const seasonContainerContainer = document.createElement("div");
    seasonContainerContainer.id = "addMenuSeasonContainerContainer";
    seasonContainerContainer.appendChild(createSeasonContainer());
    addMenuContainer.appendChild(seasonContainerContainer);
    const submitButton = document.createElement("button");
    submitButton.id = "addMenuSubmitButton";
    submitButton.textContent = "Submit";
    submitButton.onclick = () => submitEntry();
    addMenuContainer.appendChild(submitButton);
    document.body.appendChild(addMenuContainer);
    toggleDeleteSeasonButton();
}
function createSeasonContainer() {
    if (document.getElementsByClassName('addMenuSeasonContainer').length == 1) {
        toggleDeleteSeasonButton();
    }
    const seasonContainer = document.createElement("div");
    seasonContainer.className = "addMenuSeasonContainer";
    const seasonTitle = document.createElement("input");
    seasonTitle.type = "text";
    seasonTitle.placeholder = "Enter Season Title";
    seasonContainer.appendChild(seasonTitle);
    const episodeCount = document.createElement("input");
    episodeCount.type = "number";
    episodeCount.placeholder = "Episode Count";
    seasonContainer.appendChild(episodeCount);
    const typeButton = document.createElement("button");
    typeButton.id = "addMenuEpisodeButton";
    typeButton.textContent = "Type";
    typeButton.onclick = () => changeButtonType(typeButton);
    seasonContainer.appendChild(typeButton);
    const siteSelector = document.createElement("select");
    const siteCrunchyroll = document.createElement("option");
    siteCrunchyroll.textContent = "Crunchyroll";
    siteSelector.appendChild(siteCrunchyroll);
    const siteNetflix = document.createElement("option");
    siteNetflix.textContent = "Netflix";
    siteSelector.appendChild(siteNetflix);
    const siteAnimekai = document.createElement("option");
    siteAnimekai.textContent = "Animekai";
    siteSelector.appendChild(siteAnimekai);
    const siteAniWatch = document.createElement("option");
    siteAniWatch.textContent = "AniWatch";
    siteSelector.appendChild(siteAniWatch);
    const siteCinema = document.createElement("option");
    siteCinema.textContent = "Cinema";
    siteSelector.appendChild(siteCinema);
    seasonContainer.appendChild(siteSelector);
    const deleteSeasonButton = document.createElement("button");
    deleteSeasonButton.className = "addMenuDeleteSeasonButton";
    deleteSeasonButton.textContent = "[-]";
    deleteSeasonButton.onclick = () => deleteSeasonContainer(deleteSeasonButton);
    seasonContainer.appendChild(deleteSeasonButton);
    return seasonContainer;
}
function deleteSeasonContainer(deleteSeasonButton) {
    deleteSeasonButton.parentElement?.remove();
    if (document.getElementsByClassName('addMenuSeasonContainer').length == 1) {
        toggleDeleteSeasonButton();
    }
}
function toggleDeleteSeasonButton() {
    const deleteSeasonButton = document.getElementsByClassName("addMenuDeleteSeasonButton")[0];
    deleteSeasonButton.disabled = !deleteSeasonButton.disabled;
    deleteSeasonButton.style.display = (deleteSeasonButton.disabled) ? 'none' : '';
}
function changeButtonType(button) {
    button.id = (button.id == "addMenuEpisodeButton") ? "addMenuMovieButton" : (button.id == "addMenuMovieButton") ? "addMenuSpecialButton" : "addMenuEpisodeButton";
}
function submitEntry() {
    const entryTitleInput = document.getElementById("addMenuEntryTitle");
    const entryTitle = entryTitleInput?.value;
    const seasonContainers = document.getElementById("addMenuSeasonContainerContainer")?.childNodes;
    let seasonsData = [];
    for (let i = 0; i < seasonContainers?.length; i++) {
        const seasonNodes = seasonContainers[i].childNodes;
        const seasonTitle = (seasonNodes[0].value != "") ? seasonNodes[0].value : "Season " + String(i + 1);
        const episodeCount = seasonNodes[1].valueAsNumber;
        const type = seasonNodes[2].id.slice(7, -6);
        const site = seasonNodes[3].value;
        seasonsData.push([seasonTitle, episodeCount, site, type]);
    }
    createEntry(new Entry(entryTitle, seasonsData));
    closeAddMenu();
}
function closeAddMenu() {
    document.getElementById("addMenu")?.remove();
}
window.openAddMenu = openAddMenu; // Make function globally accessible for onclick handler
