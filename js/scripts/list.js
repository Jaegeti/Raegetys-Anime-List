"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Entry_1 = require("../classes/Entry");
const entries = []; // doesn't get called, gotta fix later
function openAddMenu() {
    const addMenuContainer = document.createElement("div");
    addMenuContainer.id = "addMenu"; // Div
    const header = document.createElement("div");
    header.id = "addMenuHeader";
    const containerTitle = document.createElement("h2");
    containerTitle.textContent = "Add Entry";
    header.appendChild(containerTitle);
    const exitButton = document.createElement("button");
    exitButton.id = "exitButton";
    exitButton.textContent = "X";
    exitButton.onclick = () => addMenuContainer.remove();
    header.appendChild(exitButton);
    addMenuContainer.appendChild(header);
    const entryTitle = document.createElement("input");
    entryTitle.id = "entryTitle";
    entryTitle.type = "text";
    entryTitle.placeholder = "Enter Entry Title";
    addMenuContainer.appendChild(entryTitle);
    const seasonContainerButton = document.createElement("button");
    seasonContainerButton.textContent = "[+]";
    seasonContainerButton.onclick = () => seasonContainerContainer.appendChild(createSeasonContainer());
    addMenuContainer.appendChild(seasonContainerButton);
    const seasonContainerContainer = document.createElement("div");
    seasonContainerContainer.id = "seasonContainerContainer";
    seasonContainerContainer.appendChild(createSeasonContainer());
    addMenuContainer.appendChild(seasonContainerContainer);
    const submitButton = document.createElement("button");
    submitButton.id = "submitButton";
    submitButton.textContent = "Submit";
    submitButton.onclick = () => submitEntry();
    addMenuContainer.appendChild(submitButton);
    document.body.appendChild(addMenuContainer);
    toggleDeleteSeasonButton();
}
function createSeasonContainer() {
    if (document.getElementsByClassName('seasonContainer').length == 1) {
        toggleDeleteSeasonButton();
    }
    const seasonContainer = document.createElement("div");
    seasonContainer.className = "seasonContainer";
    const seasonTitle = document.createElement("input");
    seasonTitle.type = "text";
    seasonTitle.placeholder = "Enter Season Title";
    seasonContainer.appendChild(seasonTitle);
    const episodeCount = document.createElement("input");
    episodeCount.type = "number";
    episodeCount.placeholder = "Episode Count";
    seasonContainer.appendChild(episodeCount);
    const typeButton = document.createElement("button");
    typeButton.id = "episodeButton";
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
    deleteSeasonButton.className = "deleteSeasonButton";
    deleteSeasonButton.textContent = "[-]";
    deleteSeasonButton.onclick = () => deleteSeasonContainer(deleteSeasonButton);
    seasonContainer.appendChild(deleteSeasonButton);
    return seasonContainer;
}
function deleteSeasonContainer(deleteSeasonButton) {
    deleteSeasonButton.parentElement?.remove();
    if (document.getElementsByClassName('seasonContainer').length == 1) {
        toggleDeleteSeasonButton();
    }
}
function toggleDeleteSeasonButton() {
    const deleteSeasonButton = document.getElementsByClassName("deleteSeasonButton")[0];
    deleteSeasonButton.disabled = !deleteSeasonButton.disabled;
    deleteSeasonButton.style.display = (deleteSeasonButton.disabled) ? 'none' : '';
}
function changeButtonType(button) {
    button.id = (button.id == "episodeButton") ? "movieButton" : (button.id == "movieButton") ? "specialButton" : "episodeButton";
}
function submitEntry() {
    const entryTitleInput = document.getElementById("entryTitle");
    const entryTitle = entryTitleInput?.value;
    const seasonContainers = document.getElementById("seasonContainerContainer")?.childNodes;
    let seasonsData = [];
    for (let i = 0; i < seasonContainers?.length; i++) {
        const seasonNodes = seasonContainers[i].childNodes;
        const seasonTitle = (seasonNodes[0].value != "") ? seasonNodes[0].value : "Season " + String(i + 1);
        const episodeCount = seasonNodes[1].valueAsNumber;
        const type = seasonNodes[2].id.slice(0, -6);
        const site = seasonNodes[3].value;
        seasonsData.push([seasonTitle, episodeCount, type, site]);
    }
    // entries.push(new Entry(entryTitle, seasonsData));
    const idk = new Entry_1.Entry(entryTitle, seasonsData);
    closeAddMenu();
}
function closeAddMenu() {
    document.getElementById("addMenu")?.remove();
}
window.openAddMenu = openAddMenu; // Make function globally accessible for onclick handler
