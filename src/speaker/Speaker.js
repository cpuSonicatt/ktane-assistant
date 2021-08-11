let speaker = window.speechSynthesis
speaker.rate = 0.7

export default class Speaker {

    static say(s) {
        let u = new SpeechSynthesisUtterance(s)
        u.rate = 0.9
        speaker.speak(u)
    }

    static sayRandom(s) {
        speaker.speak(new SpeechSynthesisUtterance(s[Math.floor(Math.random() * s.length)]))
    }
}