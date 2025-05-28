/**
 * Imports
 */
import { get_fixed_char } from "../test/utils/get_fixed_character.js";
import { get_fixed_index } from "../test/utils/get_fixed_index.js";
import { validate_char } from "../test/utils/validate_char.js";
import { validate_signal } from "../test/utils/validate_signal.js"; 
import { log_io } from "../utils/log_io.js";

/*----------------------------------------------------------*/
/**
 * @class Keyboard
 * @memberof Enigma
 * 
 * @since 2.2   Updates:
 * - Migrated to main
 * - Removed HTML Element rendering
 * - Migrated utility functions back to utils directory
 * - Added log object for input and output characters using utils log_io
 */
/*----------------------------------------------------------*/
export class Keyboard {

    /**
     * Log object
     * @type {object}
     * @property {string|undefined} input
     * @property {string|undefined} output
     */
    log = {};
    
    /*----------------------------------------------------------*/
    /**
     * @constructor
     * @param {void}
     * @returns {void}
     */
    /*----------------------------------------------------------*/
    constructor(){}
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
        /**
         * Log IO
         */
        this.log = log_io(letter, get_fixed_char(signal));
        /**
         * Return signal
         */
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