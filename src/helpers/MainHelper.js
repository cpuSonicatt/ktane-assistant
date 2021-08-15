import annyang from "annyang";
import Bomb from "ktane-solver/bomb"
import Speaker from "../speaker/Speaker";
import { solveButton } from "./ButtonHelper";
import { solveComplicated } from "./ComplicatedHelper";
import { solveMaze } from "./MazeHelper";
import { solveMemory } from "./MemoryHelper";
import { solvePassword } from "./PasswordHelper";
import { solveSequence } from "./SequenceHelper";
import { solveSimon } from "./SimonSaysHelper";
import { solveKeypad } from "./SymbolsHelper";
import { solveWhosOnFirst } from "./WhosOnFirstHelper";
import { solveWires } from "./WiresHelper";

let bomb;
let digit, vowel, car, frk, parallel, batteries

const mainCommands = {
    "bomb check": getBomb,
    ":module": {"regexp": /(wires|button|keypad|maze|memory|simon says|who's on first|sequence|password|complicated)/, "callback": chooseModule}
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
    digit = 2
    vowel = true
    car = false
    frk = false
    parallel = true
    batteries = 1
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
    switch (module.toLowerCase()) {
        case "wires":
            solveWires(bomb)
            break
        case "button":
            solveButton(bomb)
            break
        case "keypad":
            solveKeypad()
            break
        case "maze":
            solveMaze()
            break
        case "memory":
            solveMemory(bomb)
            break
        case "simon says":
            solveSimon(bomb)
            break
        case "who's on first":
            solveWhosOnFirst()
            break
        case "sequence":
            solveSequence(bomb)
            break
        case "password":
            solvePassword()
            break
        case "complicated":
            solveComplicated(bomb)
            break
    }
}