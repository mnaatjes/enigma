/**
 * @memberof Enigma
 */

import { ALPHABET } from "../constants.js";
import { get_fixed_char } from "../utils/get_fixed_character.js";
import { get_fixed_index } from "../utils/get_fixed_index.js";
import { validate_char } from "../utils/validate_char.js";
import { validate_signal } from "../utils/validate_signal.js";
import { EnigmaMachine } from "./Enigma.js";
/*----------------------------------------------------------*/
/**
 * @class Plugboard
 * 
 * @version 1.2     
 * @since 1.0   Created
 * @since 1.1   Restarted
 * @since 1.2   Updates:
 * - Changed #initPlugboard to public method update()
 * - Moved ALPHABET reference from constants.js to EnigmaMachine static
 * - Added log and log() method to collect configuration and input/output
 */
/*----------------------------------------------------------*/
export class Plugboard {
    /**
     * Left: Contains swapped letters
     * @type {array}
     */
    left = EnigmaMachine.ALPHABET;
    /**
     * Right: Duplicate of Fixed ALPHABET
     * @type {array}
     */
    right = EnigmaMachine.ALPHABET;
    /**
     * Settings to update plugboard configuration
     * @type {object}
     */
    settings;
    /**
     * Plugboard Connections
     * @type {object}
     */
    connections;
    /**
     * Log of plugboard
     * @type {Log}
     */
    log = {};
    /*----------------------------------------------------------*/
    /**
     * 
     * @param {object} settings 
     */
    /*----------------------------------------------------------*/
    constructor(settings){
        // Validate Settings
        this.settings = this.#validateSettings(settings);
        // Update connections
        this.connections = this.settings.connections;
        /**
         * Update Plugboard
         */
        this.left = this.update(this.settings.connections);
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
     * @param {object} settings
     */
    /*----------------------------------------------------------*/
    update(settings){
        /**
         * Duplicate initial left array
         */
        const copy_left     = [...this.left];
        /**
         * Loop settings
         */
        Object.entries(settings).forEach(([input, output]) => {
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
        if(copy_left.length === EnigmaMachine.ALPHABET.length){
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
            /**
             * Log
             */
            this.#log(input_signal, output_signal);
            /**
             * Return output
             */
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
            /**
             * Log
             */
            this.#log(input_signal, output_signal, false);
            /**
             * Return output
             */
            return output_signal;
        }
    }
    /*----------------------------------------------------------*/
    /**
     * Log transaction
     * @uses this.log
     * 
     * @param {int} input
     * @param {int} output
     */
    /*----------------------------------------------------------*/
    #log(input, output, forward=true){
        /**
         * Determine direction
         */
        if(forward === true){
            /**
             * Forward Data
             */
            this.log = {
                forward: {
                    input: {signal: input, char: EnigmaMachine.getFixedChar(input)},
                    output: {signal: output, char: EnigmaMachine.getFixedChar(output)}
                },
                backward: {},
                wiring: this.left.join(""),
                fixed: this.right.join("")
            };
        } else {
            /**
             * Backward Data
             */
            this.log.backward = {
                input: {signal: input, char: EnigmaMachine.getFixedChar(input)},
                output: {signal: output, char: EnigmaMachine.getFixedChar(output)}
            };
        }
    }
    /*----------------------------------------------------------*/
}