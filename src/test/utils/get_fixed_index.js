import { ALPHABET } from "../constants.js";
import { validate_char } from "./validate_char.js";
import { validate_signal } from "./validate_signal.js";

/**
 * @function get_fixed_index
 * 
 * @param {string} char
 * @uses ALPHABET
 * 
 * @returns {int} Index integer tied to the letter from the fixed ALPHABET
 * @throws {Error, RangeError}
 */
export function get_fixed_index(char){
    /**
     * Validate
     */
    if(!validate_char(char)){
        throw new Error(`Character supplied "${char}" is invalid!`);
    }
    /**
     * Validate Index and return
     */
    const index = ALPHABET.indexOf(char.toUpperCase());
    if(validate_signal(index)){
        return index;
    } else {
        throw new RangeError(`Could not resolve character "${char}" to index "${index}"`);
    }
}