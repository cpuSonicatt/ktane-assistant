import meSpeak from "mespeak"
import voice from "mespeak/voices/en/en.json"
import config from "mespeak/src/mespeak_config.json"


export default class Speaker {
    constructor() {
        meSpeak.loadVoice(voice);
        meSpeak.loadConfig(config);
    }

    say(s) {
        meSpeak.speak(s)
    }
}