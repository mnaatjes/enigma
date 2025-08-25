/**
 * @memberof Enigma
 */

import { get_fixed_char } from "../utils/get_fixed_character.js";
import { get_fixed_index } from "../utils/get_fixed_index.js";
import { validate_char } from "../utils/validate_char.js";
import { validate_signal } from "../utils/validate_signal.js";

export class Keyboard {
    /*----------------------------------------------------------*/
    /**
     * @constructor
     */
    /*----------------------------------------------------------*/
    constructor(){

    }
    /*----------------------------------------------------------*/
    /**
     * Converts letter {character} to signal {integer}
     * @param {string} letter
     * 
     * @returns {int} Signal index
     * @throws {Error}
     */
    /*----------------------------------------------------------*/
    forward(letter){
        /**
         * Validate
         */
        if(!validate_char(letter)){
            throw new Error(`Invalid Character "${letter}" entered at Keyboard.forward()`);
        }
        /**
         * Cast to signal
         */
        const signal = get_fixed_index(letter);
        return signal;
    }
    /*----------------------------------------------------------*/
    /**
     * Converts signal {integer} to a letter {character}
     * 
     * @param {int} signal
     * 
     * @returns {string} Character
     * @throws {Error}
     */
    /*----------------------------------------------------------*/
    backward(signal){
        /**
         * Validate
         */
        if(!validate_signal(signal)){
            throw new Error(`Invalid Signal "${signal}" entered at Keyboard.backward()`);
        }
        /**
         * Cast and return
         */
        const char = get_fixed_char(signal);
        return char;
    }
}