import { ALPHABET } from "../constants.js";

/**-------------------------------------------------------------------------*/
/**
 * @file src/components/Plugboard.js
 * 
 * @class
 * @param {object} pairs
 */
export class Plugboard {

    /**
     * @type {array} left
     */
    left = [...ALPHABET];

    /**
     * Alphabet (Right) Fixed
     * @type {array}
     */
     static FIXED = [...ALPHABET];

     /**
      * Details
      * @type {object} details
      */
     details = {};

     /**-------------------------------------------------------------------------*/
    /**
     * Constructor
     * 
     * @param {object} pairs - Key: Value pairs of letters to swap
     */
    constructor(pairs){
        // Configure / Update
        this.update(pairs);
    }

    /**-------------------------------------------------------------------------*/
    /**
     * Forward
     */
    forward(signal){
        // Find character from signal int
        const letter = Plugboard.FIXED[signal];

        // Encode using plugboard swapped keys
        return this.left.indexOf(letter);
    }

    /**-------------------------------------------------------------------------*/
    /**
     * Backward
     */
    backward(signal){
        // Find character from signal int
        const letter = this.left[signal];

        // Encode using plugboard swapped keys
        return Plugboard.FIXED.indexOf(letter);
    }

    /**-------------------------------------------------------------------------*/
    /**
     * Update
     * @param {object} pairs
     */
    update(pairs){
        // Loop pairings
        for(const key in pairs){
            // Define Right
            const value = pairs[key];

            // Find index of each character
            const keyIndex      = ALPHABET.indexOf(key);
            const valueIndex    = ALPHABET.indexOf(value);

            // Replace value
            this.left[keyIndex]     = value;
            this.left[valueIndex]   = key;
        }

        // Update details
        this.details = {
            left: this.left.join(" "),
            right: Plugboard.FIXED.join(" ")
        };
    }
}
