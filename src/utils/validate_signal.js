import { ALPHABET } from "../constants.js";

/**
 * Validates signal {integer} value of character
 * @function validate_signal
 * 
 * @param {int} signal
 * 
 * @returns {boolean}
 */
export function validate_signal(signal){
    /**
     * Check if numeric
     */
    if(isNaN(signal)){
        return false;
    }
    /**
     * Check is int
     */
    if(!Number.isInteger(signal)){
        /**
         * Try casting as integer
         */
        try {
            const parsed = parseInt(signal);
            if(isNaN(parsed)){
                // Not a number
                return false;
            } else if(parsed >= 0 && parsed < ALPHABET.length) {
                // Valid
                return true;
            }
            // Return Default
            return false;
        } catch (error){
            /**
             * Return default
             */
            return false;
        }
    }
    /**
     * Is int: Check range
     */
    if(signal >= 0 && signal < ALPHABET.length){
        return true;
    } else {
        /**
         * Return Default
         */
        return false;
    }
}
