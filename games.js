import games from './games.json'

export function getGame(game) {
    const warmups = games.warmup;
    const tweeners = games.tweener;
    const competitives = games.competitive;
    const fivePerson = games['5PersonScene'];
    const fourPerson = games['4PersonScene'];
    const threePerson = games['3PersonScene'];
    const longs = games.longForm;
    const gameArr = [warmups, tweeners, competitives, fivePerson,
        fourPerson, threePerson, longs];
    let search = [];

    switch(game) {
        case "warmup": search = warmups;
            break;
        case "tweener": search = tweeners;
            break;
        case "competitives": search = competitives;
            break;
        case "5PersonScene":
        case "5personscene":
        case "5 person scene":
        case "five person scene": search = fivePerson;
            break;
        case "4PersonScene":
        case "4personscene":
        case "4 person scene":
        case "four person scene": search = fourPerson;
            break;
        case "3PersonScene":
        case "3personscene":
        case "3 person scene":
        case "three person scene": search = threePerson;
            break;
        case "long":
        case "long form": search = longs;
            break;
        default: search = gameArr[Math.floor((Math.random() * (gameArr.length)) + 0)];
    }

    return search[Math.floor((Math.random() * (search.length)) + 0)];
}