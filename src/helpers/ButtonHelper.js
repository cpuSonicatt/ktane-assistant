import annyang from "annyang";
import Speaker from "../speaker/Speaker";
import Button from "ktane-solver/button"
import { main } from "./MainHelper";

const buttonColourTextCommand = {
    ":colour :text": {"regexp": /(red|blue|yellow|black|white) ?(abort|hold|detonate|press)?/, "callback": getSolution1 }
}

const buttonColourCommand = {
    ":colour": {"regexp": /(red|blue|yellow|black|white)/, "callback": getSolution2 }
}
let bomb;


export function solveButton(x) {
    bomb = x
    Speaker.say("button")
    annyang.removeCommands()
    annyang.addCommands(buttonColourTextCommand)
    annyang.debug(true) // remove me
    if (!annyang.isListening()) {
        annyang.start()
    }
}

function getSolution1(colour, text) {
    annyang.removeCommands()
    let input = colour + " " + text
    let solution = Button.solveStage1(input, bomb)
    if (solution === "HOLD") {
        Speaker.say("hold the button. what is the stripe colour?")
        annyang.addCommands(buttonColourCommand)
        return
    } else if (solution === "RELEASE") {
        Speaker.say("press and release the button")
        main()
    }
}

function getSolution2(colour) {
    Speaker.say("release timer. " + Button.solveStage2(colour) + ". in any position")
    annyang.removeCommands()
    main()

}