/**
 * @memberof Enigma
 */

import { ALPHABET } from "../constants.js";
import { get_fixed_char } from "../utils/get_fixed_character.js";
import { get_fixed_index } from "../utils/get_fixed_index.js";
import { validate_char } from "../utils/validate_char.js";
import { validate_signal } from "../utils/validate_signal.js";

export class Plugboard {
    /**
     * Left: Contains swapped letters
     * @type {array}
     */
    left = ALPHABET;
    /**
     * Right: Duplicate of Fixed ALPHABET
     * @type {array}
     */
    right = ALPHABET;
    /**
     * 
     */
    settings;
    /*----------------------------------------------------------*/
    /**
     * 
     * @param {object} settings 
     */
    /*----------------------------------------------------------*/
    constructor(settings){
        // Validate Settings
        this.settings = this.#validateSettings(settings);
        /**
         * Set left (altered) array
         */
        this.left = this.#initPlugboard();
    }
    /*----------------------------------------------------------*/
    /**
     * Validate settings
     */
    /*----------------------------------------------------------*/
    #validateSettings(settings){ return settings;}
    /*----------------------------------------------------------*/
    /**
     * Initialize Plugboard
     * 
     * @uses this.settings
     */
    /*----------------------------------------------------------*/
    #initPlugboard(){
        /**
         * Duplicate initial left array
         */
        const copy_left     = [...this.left];
        /**
         * Loop settings
         */
        Object.entries(this.settings).forEach(([input, output]) => {
            /**
             * Get Indexes
             */
            const index_in  = get_fixed_index(input);
            const index_out = get_fixed_index(output);
            /**
             * Replace Value at Index
             */
            copy_left[index_in]     = output;
            copy_left[index_out]    = input;
        });
        /**
         * Validate lengths and return
         */
        if(copy_left.length === ALPHABET.length){
            return copy_left;
        } else {
            throw new Error('Unable to transform left array in Plugboard.initPlugboard()!');
        }
    }
    /*----------------------------------------------------------*/
    /**
     * Forward
     */
    /*----------------------------------------------------------*/
    forward(input_signal){
        /**
         * Validate
         */
        /**
         * Get character from right (FIXED) alphabet
         */
        const char = get_fixed_char(input_signal);
        /**
         * Output:
         * - Signal from left
         * - Character from FIXED
         */
        const output_signal = this.left.indexOf(char);
        /**
         * Validate output index
         */
        if(!validate_signal(output_signal)){
            throw new Error(`Unable to parse output "${output_signal}" in Plugboard.forward()!`);
        } else {
            return output_signal;
        }
    }
    /*----------------------------------------------------------*/
    /**
     * Backward
     */
    /*----------------------------------------------------------*/
    backward(input_signal){
        /**
         * Validate
         */
        if(!validate_signal(input_signal)){
            throw new Error(`Invalid input character "${input_signal}" in Plugboard.backward()!`);
        }
        /**
         * Get character from right (FIXED) alphabet
         */
        const input_char    = this.left[input_signal];
        const output_signal = get_fixed_index(input_char);
        /**
         * Validate output index
         */
        if(!validate_signal(output_signal)){
            throw new Error(`Unable to parse output "${output_signal}" in Plugboard.forward()!`);
        } else {
            return output_signal;
        }
    }
}