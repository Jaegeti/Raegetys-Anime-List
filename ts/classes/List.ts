import { Entry } from "./Entry.js";

export class List {
    listTitle: string;
    entries: Entry[] = [];
 
    constructor(listTitle: string = "New List") {
        this.listTitle = listTitle;
        this.entries = [];
    }
}