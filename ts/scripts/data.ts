import * as fs from 'fs';
import { List } from "../classes/List.js";

export function saveData(lists: List[]): void {
    const dataDict = createDataDict(lists);

    const jsonString = JSON.stringify(dataDict, null, 2);

    try {
        console.log('Writing data to file...');
        fs.writeFileSync('.listData.json', jsonString, 'utf-8');
        console.log('Success! Wrote data to file.');
    } catch (error) {
        console.error('Error writing to file:', error);
    }
}

export function createDataDict(lists: List[]): Record<string, any> {
    const dataDict: Record<string, any> = {};
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

    return dataDict;
}

export function loadData(): Record<string, any> {
    
    try {
        const rawData = fs.readFileSync('./listData.json', 'utf-8');
        const loadedDict = JSON.parse(rawData) as Record<string, any>;

        console.log('Data loaded successfully:' + <string>loadedDict.name);
        return loadedDict;
    } catch (error) {
        console.error('Error reading the file:', error);
        return {};
    }
}