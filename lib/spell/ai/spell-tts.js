/** 
 * Spell AI Text-to-Speech AI Engine
 * @description Spell AI engine support for Text-to-Speech using O/S capabilities
 * @author Captain Crypto
 * @since 03/05/2022
 * @Copyright AIME Web3 Technologies 2022, all right reserved
 * @versions
 * V1 -> Default browser (local off-line) voices
 * 
 * @license GPL-3
 *      This program is free software; you can redistribute it and/or
 *		modify it under the terms of the GNU General Public License
 *		as published by the Free Software Foundation; either version
 *		3 of the License, or (at your option) any later version.
  */




/**
 * Spell Web Browser default voices
 */
export class SpellWebVoice {

    constructor() {


        this.synth = null;
        this.voices = null;
        this.defaults_voice = null;
        this.defaults_voice_name = null;
        this.speech_rate = 1;
        this.speech_pitch = 1;
        this.pron = {};
    }



    set_pron(pron_dict) {
        this.pron = pron_dict;
    }

    apply_voices() {
        this.voices = this.synth.getVoices();
        //console.log("total voices: " + this.voices.length);
        if (this.defaults_voice_name) {
            this.set_voice_by_name(this.defaults_voice_name);
            this.defaults_voice_name = null;
        }
    }

    load_voices(default_voice = null) {

        this.synth = window.speechSynthesis;
        this.defaults_voice_name = default_voice;
        //chrome event
        const sthis = this
        if (typeof this.synth !== 'undefined' && this.synth.onvoiceschanged !== undefined) {
            this.synth.onvoiceschanged = function () {
                sthis.apply_voices();
            }
        }
        else {
            this.apply_voices();
        }

    }

    set_voice(index) {
        this.default_voice = index;
    }

    set_voice_by_name(voice_name) {
        if (this.voices) {
            for (let i = 0; i < this.voices.length; i++) {
                //console.log("bot voice " + this.voices[i].name + ' (' + this.voices[i].lang + ')')
                if (this.voices[i].name.toLowerCase() == voice_name.toLowerCase()) {
                    console.log("bot voice is set to " + this.voices[i].name + ' (' + this.voices[i].lang + ')')
                    this.set_voice(i)
                }
            }
        }
    }

    speak(text, on_speech_word = null, on_speech_end = null) {
        if (this.synth) {
            let utter = new SpeechSynthesisUtterance();
            if (this.default_voice) {
                utter.voice = this.voices[this.default_voice];
            }
            utter.pitch = this.speech_pitch;
            utter.rate = this.speech_rate;

            let l_txt = text.toLowerCase();
            let pkeys = Object.keys(this.pron);
            pkeys.forEach(word => {
                while (l_txt.indexOf(word) > -1) {
                    l_txt = l_txt.replace(word, this.pron[word]);
                }
            });
            utter.text = l_txt;

            utter.onboundary = on_speech_word;
            utter.onend = on_speech_end;

            this.synth.speak(utter);

            return new Promise(resolve => {
                const id = setInterval(() => {
                    if (PAIWebVoice.get_instance().synth.speaking === false) {
                        //console.log("stop speak");
                        clearInterval(id);
                        resolve();
                    }
                }, 100);
            });
        }
    }
}

export default SpellWebVoice


