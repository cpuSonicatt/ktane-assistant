import FuzzySet from "fuzzyset.js";
import { Component } from "react";
import Speaker from "./helpers/Speaker"

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recog = new SpeechRecognition();
const a = FuzzySet(["defuse wires", "solve wires", "bomb check"])
const s = new Speaker()


class App extends Component {

    constructor() {
        super()
        this.state = {
            openMic: false
        }
    }

    componentDidMount() {        
        recog.continuous = true;
        recog.lang = "en-GB";
        recog.interimResults = false;
        recog.maxAlternatives = 1;

        recog.onresult = function(event) {
            switch (a.get(event.results[event.results.length - 1][0].transcript)[0][1]) {
                case "defuse wires":
                case "solve wires":
                    h.solveWires()
                case "bomb check":
                    h.bombCheck()
            }
            
        }

    }

    handleOnClick = () => {
        if (!this.state.openMic) {
            recog.start()
            this.setState({
                openMic: true
            })
            s.say("Let's go")
        } else {
            recog.stop()
            this.setState({
                openMic: false
            })
        }
    }

    

    render() {
        return(
            <div>
                <p>fuck you</p>
                <button onClick={() => this.handleOnClick()}>{this.state.openMic ? "ON" : "OFF"}</button>
            </div>
        )
    }
}

export default App;
