import {BOT} from './constants.js'
import games from './games.json';
import suggestions from './suggestions.json'

export function getHelp() {
    let options = "Options\ntype: game, suggestion\n\n";

    console.log(Object.keys(games));

    options += "game names:\n"
    Object.keys(games).forEach(name => {
        options += name + ", ";
    })
    options +="\n\n";

    options += "suggestion names:\n"
    for(let i = 0; i < suggestions.length; i++) {
        if(!options.includes(suggestions[i].type.toLowerCase()))
            options += suggestions[i].type.toLowerCase() + ", ";
    }
    options +="\n\n";

    return BOT + "\n\n" + options;
}