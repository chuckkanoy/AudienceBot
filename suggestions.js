import suggestions from './suggestions.json'

var objects, locations, people, feelings, actions;

export function parseSuggestions() {
    let numObjects = 0, numLocations = 0, numPeople = 0,
        numFeelings = 0, numActions = 0;

    suggestions.forEach(suggestion => {
        switch(suggestion.type){
            case "Object":
                numObjects++; break;
            case "Location":
                numLocations++; break;
            case "Person":
                numPeople++; break;
            case "Feeling":
                numFeelings++; break;
            case "Something to do":
                numActions++; break;
        }
    })

    objects = [numObjects];
    locations = [numLocations];
    people = [numPeople];
    feelings = [numFeelings];
    actions = [numActions];

    numObjects = 0, numLocations = 0, numPeople = 0,
    numFeelings = 0, numActions = 0;

    suggestions.forEach(suggestion => {
        switch(suggestion.type){
            case "Object":
                objects[numObjects] = suggestion;
                numObjects++; break;
            case "Location":
                locations[numLocations] = suggestion;
                numLocations++; break;
            case "Person":
                people[numPeople] = suggestion;
                numPeople++; break;
            case "Feeling":
                feelings[numFeelings] = suggestion;
                numFeelings++; break;
            case "Something to do":
                actions[numActions] = suggestion;
                numActions++; break;
        }
    })
}

export function getSuggestion(suggestion) {
    const suggestionArr = [objects, locations, people, feelings,
        actions];
    let search = [];

    switch(suggestion) {
        case "object": search = objects;
            break;
        case "location": search = locations;
            break;
        case "person": search = people;
            break;
        case "feeling": search = feelings;
            break;
        case "something to do":
        case "action": search = actions;
            break;
        default: search = suggestionArr[Math.floor((Math.random() * (suggestionArr.length)))];
    }

    return search[Math.floor((Math.random() * (search.length)))].suggestion;
}