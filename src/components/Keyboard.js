import { ALPHABET } from "../../constants.js";

/**
 * @file src/components/Keyboard.js
 * 
 * @class
 */
export class Keyboard {

    /**-------------------------------------------------------------------------*/
    /**
     * Constructor
     */
    constructor(){}

    /**-------------------------------------------------------------------------*/
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

    /**-------------------------------------------------------------------------*/
    /**
     * Backward
     * 
     * @param {number} signal
     */
    backward(signal){
        // Convert to letter
        return ALPHABET[signal];
    }
}
