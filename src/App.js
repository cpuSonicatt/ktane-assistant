import { Component } from "react";
import { main } from "./helpers/MainHelper";
import Speaker from "./speaker/Speaker";

class App extends Component {

    gotoMain() {
        Speaker.say("ready") // sayRandom
        main()
    }
    
    render() {
        return(
            <div>
                <p>fuck you</p>
                <button onClick={() => this.gotoMain()}>fuck you too</button>
            </div>
        )
    }


}

export default App;
