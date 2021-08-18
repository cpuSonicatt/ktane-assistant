import annyang from "annyang";
import Speaker from "../speaker/Speaker";
import Maze from "ktane-solver/maze"
import { main } from "./MainHelper";

let indicator
let square
let triangle

const mazeCommands = {
    "indicator :x :y": {"regexp": /indicator (1|2|3|4|5|6) ?(1|2|3|4|5|6)/, "callback": setIndicator},
    "square :x :y": {"regexp": /square (1|2|3|4|5|6) ?(1|2|3|4|5|6)/, "callback": setSquare},
    "triangle :x :y": {"regexp": /triangle (1|2|3|4|5|6) ?(1|2|3|4|5|6)/, "callback": setTriangle}
}


export function solveMaze() {
    Speaker.say("maze")
    awaitMaze()
    annyang.removeCommands()
    annyang.addCommands(mazeCommands)
    annyang.debug(true) // remove me
    if (!annyang.isListening()) {
        annyang.start()
    }}

function awaitMaze() {
    if (indicator == null || square == null || triangle == null) {
        setTimeout(awaitMaze, 250)
    } else {
        Speaker.say("ready")
        getSolution()
        main()
    }

}

function getSolution() {
    let solution = Maze.solve(indicator, square, triangle)
    for (let direction of solution) {
        Speaker.say(direction)
    }
    return
}

function setIndicator(x, y) {
    Speaker.say(`indicator ${x} ${y}`)
    indicator = [x, y]
}

function setSquare(x, y) {
    Speaker.say(`square ${x} ${y}`)
    square = [x, y]
}

function setTriangle(x, y) {
    Speaker.say(`triangle ${x} ${y}`)
    triangle = [x, y]
}