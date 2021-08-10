let speaker = window.speechSynthesis

export default class Speaker {

    static say(s) {
        speaker.speak(new SpeechSynthesisUtterance(s))
    }

    static sayRandom(s) {
        speaker.speak(new SpeechSynthesisUtterance(s[Math.floor(Math.random() * s.length)]))
    }
}