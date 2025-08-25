import { ALPHABET } from "../constants.js";
import { validate_char } from "./validate_char.js";
import { validate_signal } from "./validate_signal.js";

/**
 * @function get_fixed_char
 * 
 * @param {int} signal
 * @uses ALPHABET
 * 
 * @returns {string} Character from ALPHABET
 * @throws {Error}
 */
export function get_fixed_char(signal){
    /**
     * Validate
     */
    if(!validate_signal(signal)){
        throw new Error(`Signal "${signal}" is invalid!`);
    }
    /**
     * Cast as int if string
     */
    if(typeof signal === 'string'){
        signal = parseInt(signal);
    }
    /**
     * Convert
     */
    const char = ALPHABET[signal];
    /**
     * Validate and return
     */
    if(validate_char(char)){
        return char;
    } else {
        throw new Error(`Could not resolve signal "${signal}" to character "${char}"!`);
    }
}