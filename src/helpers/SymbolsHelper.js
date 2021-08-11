import annyang from "annyang";
import Speaker from "../speaker/Speaker";
import Keypad from "ktane-solver/keypad"
import { main } from "./MainHelper";

let symbolsArray

const keypadButtons = {
    ":symbol": {"regexp": /(ash|at|b|balloon|black star|but|c with dot|kitty|copyright|double k|dragon|euro|fork|h|half three|lambda|letter n|lightning|omega|paragraph|pig tail|question|reverse c|six|smiley|stitch|white star)/,
                "callback":getSolution}
}


/* TODO:
    this shit fukin sucks do it better
*/
export function solveKeypad() {
    symbolsArray = []
    Speaker.say("keypad")
    annyang.removeCommands()
    annyang.addCommands(keypadButtons)
    annyang.debug(true) // remove me
    annyang.start()
}

function getSolution(symbol) {
    symbolsArray.push(symbol)
    if (symbolsArray.length === 4) {
        Speaker.say("okay")
        let x = symbolsArray.indexOf("but")
        let y = symbolsArray.indexOf("h")
        if (x !== -1) {
            symbolsArray[x] = "butt"
        } else if (y !== -1) {
            symbolsArray[y] = "curly h"
        }
        let solution = Keypad.solve(symbolsArray)
        for (let symbolSolution of solution) {
            Speaker.say(symbolSolution)
        }
        annyang.removeCommands()
        main()
    } else {
        Speaker.say("next")
    }
}