import annyang from "annyang";
import Speaker from "../speaker/Speaker";
import Wires from "ktane-solver/wires"
import { main } from "./MainHelper";


let bomb;

const wireCommands = {
    "*wires": getSolution
}

export function solveWires(x) {
    bomb = x
    Speaker.say("wires")
    annyang.removeCommands()
    annyang.addCommands(wireCommands)
    annyang.debug(true) // remove me
    annyang.start()

}

function getSolution(wires) {
    Speaker.say(wires)
    let wiresArray = wires.split(" ")

    // get the wire index to cut, + 1, and convert to ordinal
    Speaker.say("cut the " + getOrdinal(Wires.solve(wiresArray, bomb) + 1, wiresArray.length) + " wire")

    annyang.removeCommands()
    main()
}

function getOrdinal(num, length) {
    if (num === length) {
        return "last"
    }
    switch (num % 10) {
        case 1:
            return num + "st"
        case 2:
            return num + "nd"
        case 3:
            return num + "rd"
        default:
            return num + "th"
    }

}