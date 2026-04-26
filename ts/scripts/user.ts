import { List } from "../classes/List.js";
import { Entry } from "../classes/Entry.js";

export const lists: List[] = [];
export let listIndex: number = 0;

if (typeof document !== 'undefined') {
    loadUser();
}

function createList(listTitle: string = "New List"): void {
    lists.push(new List(listTitle));
    console.log("List pushed!");

    const currentListId = lists.length - 1; // +

    const referenceToListSite = document.createElement("a");
    //referenceToListSite.href = "list.html"
    referenceToListSite.href = `list/${currentListId}`;

    const listButton = document.createElement("button");
    listButton.id = "listButton"+document.getElementsByClassName("listButton").length;
    listButton.className = "listButton";
    listButton.textContent = listTitle;
    //listButton.onclick = () => openList(listButton);

    referenceToListSite.appendChild(listButton);
    document.getElementById("listContainer")?.appendChild(referenceToListSite);

    fetchData();
}

function openList(openListButton: HTMLButtonElement): void {
    listIndex = Number(openListButton.id.slice(10));
}

function loadUser() {
    const listContainer = document.createElement("div");
    listContainer.id = "listContainer";
    document.body.appendChild(listContainer);
}

export function fetchData() {
    fetch('/api/save-lists', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(lists)
    })
    .then(response => console.log("Successfully sent data to server!"))
    .catch(error => console.error("Error sending data:", error));
}

if (typeof window !== 'undefined') {
    (window as any).createList = createList;
    (window as any).loadUser = loadUser;
}