import config from './config.json';
import {getGame} from './games.js';
import {parseSuggestions, getSuggestion} from './suggestions.js';
import {getHelp} from './help.js';
import {} from 'dotenv/config.js';

import Discord from 'discord.js';
const client = new Discord.Client();

function separate(message) {
    let contentString = message.content;
        let spcIndex = contentString.indexOf(" ");
        let buffer = contentString.substring(spcIndex + 1, contentString.length);
        spcIndex = buffer.indexOf(" ");
        let type = "", specific = "";

        if(spcIndex === -1) {
            type = buffer;
            specific = "none"
        } else {
            type = buffer.substring(0, spcIndex);
            specific = buffer.substring(spcIndex + 1, buffer.length);
        }

        return {type, specific};
}

client.once('ready', () => {
    parseSuggestions();
    console.log("Audience is prepared to be entertained!👏");
});

client.on('message', (message) => {
    const separated = separate(message);
    const type = separated.type;
    const specific = separated.specific;
    const called = message.content.substring(0, config.prefix.length);

    if(called.includes(config.prefix)) {
        if(type !== config.prefix) {
            switch(type) {
                case "game": 
                    message.channel.send(getGame(specific));
                    break;
                case "suggestion":
                    message.channel.send(getSuggestion(specific));
                    break;
                default:
                    message.channel.send(getHelp());
                    break;
            }
        } else {
            message.channel.send(getHelp());
        }
    }
});

client.login(process.env.TOKEN);