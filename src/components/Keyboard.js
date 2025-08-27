import { ALPHABET } from "../../constants.js";
import { Rotor } from "./Rotor.js";

/**
 * @file src/components/Keyboard.js
 * 
 * @class
 * @param {}
 */
export class Keyboard {

    /**
     * Constructor
     */
    constructor(){}

    /**
     * Forward
     * 
     * @param {string} letter
     */
    forward(letter){
        // Convert to Signal
        let signal = ALPHABET.indexOf(letter);
        return signal;
    }

    /**
     * Backward
     * 
     * @param {int} signal
     */
    backward(signal){
        // Convert to letter
        return ALPHABET[signal];
    }
}
