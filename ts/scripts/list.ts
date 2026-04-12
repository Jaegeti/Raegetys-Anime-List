import { Entry } from "../classes/Entry";

function openAddMenu() {
    const addMenuContainer = document.createElement("div");
    addMenuContainer.id = "addMenu";   // Div

    const header = document.createElement("div");
    header.id = "addMenuHeader";

    const containerTitle = document.createElement("h2");
    containerTitle.textContent = "Add Entry";
    header.appendChild(containerTitle);

    const exitButton = document.createElement("button");
    exitButton.textContent = "X";
    exitButton.onclick = () => addMenuContainer.remove();
    header.appendChild(exitButton);

    addMenuContainer.appendChild(header);

    const entryTitle = document.createElement("input");
    entryTitle.type = "text";
    entryTitle.placeholder = "Enter Entry Title";
    addMenuContainer.appendChild(entryTitle);

    const seasonContainerContainer = document.createElement("div");
    seasonContainerContainer.id = "seasonContainerContainer";
    seasonContainerContainer.appendChild(createSeasonContainer());
    addMenuContainer.appendChild(seasonContainerContainer);

    const seasonContainerButton = document.createElement("button");
    seasonContainerButton.textContent = "[+]";
    seasonContainerButton.onclick = () => seasonContainerContainer.appendChild(createSeasonContainer());
    addMenuContainer.appendChild(seasonContainerButton);

    document.body.appendChild(addMenuContainer);
}

function createSeasonContainer() {
    const seasonContainer = document.createElement("div");
    seasonContainer.id = "seasonContainer"; // should be class but buggy ig uwu idk
    
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

    return seasonContainer;
}

function changeButtonType(button: Element) {
    if (button.id == "episodeButton") {
        button.id = "movieButton";
    } else if (button.id == "movieButton") {
        button.id = "specialButton";
    } else if (button.id == "specialButton") {
        button.id = "episodeButton";
    }
}

(window as any).openAddMenu = openAddMenu; // Make function globally accessible for onclick handler