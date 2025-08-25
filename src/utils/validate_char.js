import { ALPHABET } from "../constants.js";

/**
 * Validates signal character
 * 
 * @param {string} char
 * 
 * @return {boolean}
 */
export function validate_char(char){
    /**
     * Check Type
     */
    if(typeof char !== 'string'){
        return false;
    }
    /**
     * Check length
     */
    if(char.length > 1){
        return false;
    }
    /**
     * Check character:
     * - Non-numeric
     * - Pregmatch
     */
    if(!isNaN(char)){
        return false;
    }
    if(!/^[a-zA-Z]$/.test(char)){
        return false;
    }
    /**
     * Evaluate
     */
    return ALPHABET.includes(char.toUpperCase());
}