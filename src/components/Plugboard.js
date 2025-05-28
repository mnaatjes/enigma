/**
 * Imports
 */
import { ALPHABET } from "../constants.js";
import { get_fixed_index } from "../test/utils/get_fixed_index.js";
import { get_fixed_char } from "../test/utils/get_fixed_character.js";
import { validate_char } from "../test/utils/validate_char.js";
import { validate_signal } from "../test/utils/validate_signal.js";
import { log_io } from "../utils/log_io.js";

/*----------------------------------------------------------*/
/**
 * @class Plugboard
 * 
 * @version 1.3     
 * @since 1.0   Created
 * @since 1.1   Restarted
 * @since 1.2   Updates:
 * - Changed #initPlugboard to public method update()
 * - Moved ALPHABET reference from constants.js to EnigmaMachine static
 * - Added log and log() method to collect configuration and input/output
 * @since 1.3   Updates:
 * - Migrated to main components dir
 * - Simplified logging
 * - References to Constants back to constants.js
 * - TODO: Configuration validation and parsing done in EnigmaMachine Class
 * - Renamed "settings" property to "connections" property
 */
/*----------------------------------------------------------*/
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
     * Connections key - value pairs to set plugboard
     * @type {object}
     */
    connections;

    /**
     * Log object
     * @type {object}
     * @property {string|undefined} input
     * @property {string|undefined} output
     */
    log = {};

    /*----------------------------------------------------------*/
    /**
     * @construct
     * @since 1.3 Updated
     * 
     * @param {object} connections Key: Value pairs of letters to exchange
     */
    /*----------------------------------------------------------*/
    constructor(connections){
        /**
         * Update
         */
        this.update(connections);
    }
    /*----------------------------------------------------------*/
    /**
     * Update Plugboard settings
     * 
     * @param {object} connections
     */
    /*----------------------------------------------------------*/
    update(connections){
        /**
         * Assign
         */
        this.connections = connections;
        /**
         * Duplicate initial left array
         */
        const copy_left     = [...this.left];
        /**
         * Loop settings
         */
        Object.entries(connections).forEach(([input, output]) => {
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
         * Validate lengths
         */
        if(copy_left.length === ALPHABET.length){
            /**
             * Assign to left wiring
             */
            this.left = copy_left;
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
            this.log = log_io(char, get_fixed_char(output_signal));
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
            this.log = log_io(input_char, get_fixed_char(output_signal), false, this.log);
            /**
             * Return output
             */
            return output_signal;
        }
    }
}