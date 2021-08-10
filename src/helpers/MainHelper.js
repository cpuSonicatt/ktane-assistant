import annyang from "annyang";
import Bomb from "ktane-solver/bomb"
import Speaker from "../speaker/Speaker";
import { solveWires } from "./WiresHelper";

let bomb;
let digit, vowel, car, frk, parallel, batteries

const mainCommands = {
    "bomb check": getBomb,
    "solve :module": {"regexp": /solve (wires|button|complicated)/, "callback": chooseModule}
}

const bombCheckCommands = {
    "digit :num": {regexp: /digit (1|2|3|4|5|6|7|8|9|0)/, callback: addDigit},
    "vowel :bool": {regexp: /vowel (yes|no)/, callback: addVowel},
    "car :bool": {regexp: /car (yes|no)/, callback: addCar},
    "freak :bool": {regexp: /freak (yes|no)/, callback: addFreak},
    "parallel port :bool": {regexp: /parallel port (yes|no)/, callback: addPPort},
    "batteries :num": {regexp: /batteries (1|2|3|4|5|6|7|8|9|0)/, callback: addBatteries},
    "debug": debug
}

export function main() {
    console.log("test")
    annyang.debug(true) // remove me
    annyang.addCommands(mainCommands)
    
    annyang.start()
}

function getBomb() {
    annyang.debug(true) // remove me
    annyang.removeCommands()
    annyang.addCommands(bombCheckCommands)
    Speaker.say("check")
    awaitBomb()
    main()
}

function debug() {
    digit = 0
    vowel = true
    car = false
    frk = false
    parallel = false
    batteries = 0
}

function awaitBomb() {
    if (digit == null || vowel == null || car == null || frk == null || parallel == null || batteries == null) {
        setTimeout(awaitBomb, 250)
    } else {
        Speaker.say("done")
        bomb = new Bomb(digit, vowel, car, frk, parallel, batteries)
        return
    }
}

function addDigit(num) {
    digit = num
    Speaker.say("digit is "+ num)
}

function addVowel(bool) {
    let isYes = bool === "yes" ? true : false
    vowel = isYes
    Speaker.say((isYes ? "" : "no ") + "vowel")
}

function addCar(bool) {
    let isYes = bool === "yes" ? true : false
    car = isYes
    Speaker.say((bool === "yes" ? "" : "no ") + "car")
}

function addFreak(bool) {
    let isYes = bool === "yes" ? true : false
    frk = isYes
    Speaker.say((bool === "yes" ? "" : "no ") + "freak")
}

function addPPort(bool) {
    let isYes = bool === "yes" ? true : false
    parallel = isYes
    Speaker.say((bool === "yes" ? "" : "no ") + "parallel port")
}

function addBatteries(num) {
    batteries = num
    Speaker.say(num + " batteries")
}

function chooseModule(module) {
    annyang.abort()
    switch (module) {
        case "wires":
            solveWires(bomb)
    }
}
