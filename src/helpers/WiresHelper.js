import annyang from "annyang";
import Speaker from "../speaker/Speaker";
import Wires from "ktane-solver/wires"
import { main } from "./MainHelper";


let bomb;

const wireCommands = { // disgusting
    "wires": {"regexp": /(red|blue|yellow|black|white) ?(red|blue|yellow|black|white) ?(red|blue|yellow|black|white) ?(red|blue|yellow|black|white)? ?(red|blue|yellow|black|white)? ?(red|blue|yellow|black|white)?/,
                "callback": getSolution}
}

export function solveWires(x) {
    bomb = x
    Speaker.say("wires")
    annyang.removeCommands()
    annyang.addCommands(wireCommands)
    annyang.debug(true) // remove me
    if (!annyang.isListening()) {
        annyang.start()
    }
}

function getSolution(...wires) {
    Speaker.say(wires)

    wires = wires.filter((wire) => {
        return wire != null
    })

    // get the wire index to cut, + 1, and convert to ordinal
    Speaker.say("cut the " + getOrdinal(Wires.solve(wires, bomb) + 1, wires.length) + " wire")

    annyang.removeCommands("wires")
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