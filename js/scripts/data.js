import * as fs from 'fs';
export function saveData(lists) {
    console.log("Saving Data...");
    const dataDict = createDataDict(lists);
    const jsonString = JSON.stringify(dataDict, null, 2);
    try {
        console.log('Writing data to file...');
        fs.writeFileSync('./listData.json', jsonString, 'utf-8');
        console.log('Success! Wrote data to file.');
    }
    catch (error) {
        console.error('Error writing to file:', error);
    }
}
export function createDataDict(lists) {
    const dataDict = {};
    for (let i = 0; i < lists.length; i++) {
        dataDict[i] = {};
        dataDict[i]["listTitle"] = lists[i].listTitle;
        if (!lists[i].entries)
            continue;
        dataDict[i]["entries"] = {};
        for (let j = 0; j < lists[i].entries.length; j++) {
            dataDict[i]["entries"][j] = {};
            dataDict[i]["entries"][j]["entryTitle"] = lists[i].entries[j].mainTitle;
            dataDict[i]["entries"][j]["status"] = lists[i].entries[j].status;
            dataDict[i]["entries"][j]["rewatched"] = lists[i].entries[j].rewatched;
            dataDict[i]["entries"][j]["totalEpisodes"] = lists[i].entries[j].totalEpisodes;
            dataDict[i]["entries"][j]["progress"] = lists[i].entries[j].progress;
            dataDict[i]["entries"][j]["seasons"] = {};
            for (let k = 0; k < lists[i].entries[j].seasons.length; k++) {
                dataDict[i]["entries"][j]["seasons"][k] = {};
                dataDict[i]["entries"][j]["seasons"][k]["seasonTitle"] = lists[i].entries[j].seasons[k].title;
                dataDict[i]["entries"][j]["seasons"][k]["site"] = lists[i].entries[j].seasons[k].site;
                dataDict[i]["entries"][j]["seasons"][k]["rating"] = lists[i].entries[j].seasons[k].rating;
                dataDict[i]["entries"][j]["seasons"][k]["episodes"] = {};
                for (let l = 0; l < lists[i].entries[j].seasons[k].episodes.length; l++) {
                    dataDict[i]["entries"][j]["seasons"][k]["episodes"][l] = {};
                    dataDict[i]["entries"][j]["seasons"][k]["episodes"][l]["text"] = lists[i].entries[j].seasons[k].episodes[l].text;
                    dataDict[i]["entries"][j]["seasons"][k]["episodes"][l]["completed"] = lists[i].entries[j].seasons[k].episodes[l].completed;
                    dataDict[i]["entries"][j]["seasons"][k]["episodes"][l]["type"] = lists[i].entries[j].seasons[k].episodes[l].type;
                    dataDict[i]["entries"][j]["seasons"][k]["episodes"][l]["site"] = lists[i].entries[j].seasons[k].episodes[l].site;
                }
            }
        }
    }
    return dataDict;
}
export function loadData() {
    try {
        const rawData = fs.readFileSync('./listData.json', 'utf-8');
        const loadedDict = JSON.parse(rawData);
        console.log('Data loaded successfully:' + loadedDict.name);
        console.log("could fetch listData.json");
        return loadedDict;
    }
    catch (error) {
        console.error('Error reading the file:', error);
        console.log("could not fetch listData.json");
        return {};
    }
}
