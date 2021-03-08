//RUNNING: node --experimental-json-modules index.js

// const config = require('./config.json');
import config from './config.json';
import {getGame} from './games.js';
import {parseSuggestions, getSuggestion} from './suggestions.js';
import {getHelp} from './help.js';
// const improv = require('./improv.json');
// import './improv.json';
// const games = require('./games.js');
import {} from 'dotenv/config.js';

import Discord from 'discord.js';
// const Discord = require('discord.js');
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

// function getTest(game) {
//     const warmups = improv.games.warmups;
//     const tweeners = improv.games.tweeners;
//     const competitives = improv.games.competitives;
//     const fivePerson = improv.games['5PersonScenes'];
//     const fourPerson = improv.games['4PersonScenes'];
//     const threePerson = improv.games['3PersonScenes'];
//     const longs = improv.games.longForms;
//     const gameArr = [warmups, tweeners, competitives, fivePerson,
//         fourPerson, threePerson, longs];
//     let search = [];

//     switch(game) {
//         case "warmup": search = warmups;
//             break;
//         case "tweener": search = tweeners;
//             break;
//         case "competitives": search = competitives;
//             break;
//         case "5 person scene":
//         case "five person scene": search = fivePerson;
//             break;
//         case "4 person scene":
//         case "four person scene": search = fourPerson;
//             break;
//         case "3 person scene":
//         case "three person scene": search = threePerson;
//             break;
//         case "long":
//         case "long form": search = longs;
//             break;
//         default: search = gameArr[Math.floor((Math.random() * (gameArr.length - 1)) + 0)];
//     }

//     return search[Math.floor((Math.random() * (search.length - 1)) + 0)];
// }

client.login(process.env.TOKEN);