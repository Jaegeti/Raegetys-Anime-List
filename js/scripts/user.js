import { List } from "../classes/List.js";
export const lists = [];
export let listIndex = 0;
loadUser();
function createList(listTitle = "New List") {
    lists.push(new List(listTitle));
    console.log("List pushed!"+lists);
    const currentListId = lists.length - 1; // +
    const referenceToListSite = document.createElement("a");
    //referenceToListSite.href = "list.html"
    referenceToListSite.href = `list/${currentListId}`;
    const listButton = document.createElement("button");
    listButton.id = "listButton" + document.getElementsByClassName("listButton").length;
    listButton.className = "listButton";
    listButton.textContent = listTitle;
    //listButton.onclick = () => openList(listButton);
    referenceToListSite.appendChild(listButton);
    document.getElementById("listContainer")?.appendChild(referenceToListSite);
}
function openList(openListButton) {
    listIndex = Number(openListButton.id.slice(10));
}
function loadUser() {
    const listContainer = document.createElement("div");
    listContainer.id = "listContainer";
    document.body.appendChild(listContainer);
}
window.createList = createList;
window.loadUser = loadUser;
