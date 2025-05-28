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
 * @class Rotor
 * @memberof Enigma
 * 
 * @version 2.0
 * @since 1.0   Created
 * @since 2.0   Updates:
 * - Migrated to main
 * - Removed Debugging
 * - Updated logging
 * - Moved ring setting and position setting from EnigmaMachine to Rotor class
 */
/*----------------------------------------------------------*/
export class Rotor {

    /**
     * Regular Alphabet LEFT
     * @type {array}
     */
    fixed = ALPHABET;
    
    /**
     * Cypher RIGHT
     * @type {array}
     */
    wiring = [];
    
    /**
     * Order of Rotor within Enigma machine
     * - 0 indexed
     * - From Left[0] to Right[2]
     * @type {int}
     */
    order;
    
    /**
     * Previous head character of rotor:
     * - Used for determining if rotor has stepped
     * @type {string}
     */
    prevHead;
    
    /**
     * Log of Rotor
     * @type {Log}
     */
    log = {};

    /**
     * Initial Ring setting
     * @type {string}
     */
    ring_setting;

    /*----------------------------------------------------------*/
    /**
     * @constructor
     * @since 2.0 Updates:
     * - Changed how settings and managed
     * - Incorporate Update
     */
    /*----------------------------------------------------------*/
    constructor(settings){
        this.update(settings);
    }
    /*----------------------------------------------------------*/
    /**
     * Update rotor settings
     * 
     * @param {object} settings
     * @returns {void} Assigns settings and rotates ring and position to init
     */
    /*----------------------------------------------------------*/
    update(settings){
        /**
         * Assign properties
         */
        this.name       = settings.name;
        this.wiring     = settings.wiring;
        this.notch      = settings.notch;
        this.order      = settings.order;
        this.prevHead   = this.getHead();
        /**
         * Set Ring Setting
         */
        this.ring_setting = settings.ring_setting;
        this.setRing(get_fixed_index(settings.ring_setting));
        /**
         * Set Ring Position
         */
        this.setPosition(settings.init_position);
    }
    /*----------------------------------------------------------*/
    /**
     * Get Current or Head of rotor
     */
    /*----------------------------------------------------------*/
    getHead(){return this.fixed[0];}
    /*----------------------------------------------------------*/
    /**
     * Checks if the rotor has rotated since last keypress
     * 
     * @uses this.getHead()
     * @uses this.prevHead
     * @param {void}
     * 
     * @returns {boolean}
     */
    /*----------------------------------------------------------*/
    hasStepped(){return this.getHead() !== this.prevHead;}
    /*----------------------------------------------------------*/
    /**
     * Set Ring Setting and assign notch
     * 
     * @param {number} [n=0] Number of rotations
     * @returns {void}
     */
    /*----------------------------------------------------------*/
    setRing(n=0){
        /**
         * Rotate Rotor Backwards
         */
        this.rotate(n, false);
        /**
         * Adjust turnover notch relative to wiring:
         * - Get index of existing notch
         * - Adjust
         * - Render new notch character
         */
        const index = get_fixed_index(this.notch);
        const notch = get_fixed_char(((index - n) + 26) % 26);
        /**
         * Assign Notch
         */
        this.notch = notch;
    }
    /*----------------------------------------------------------*/
    /**
     * Rotate to letter index
     * 
     * @param {int|string} arg 
     * @returns {void} Rotates Rotor position to given argument (signal or character)
     */
    /*----------------------------------------------------------*/
    setPosition(arg){
        /**
         * Validate
         */
        const index = validate_char(arg) ? get_fixed_index(arg) : (
            validate_signal(arg) ? arg : null
        );
        /**
         * Rotate or throw Error
         */
        if(index !== null){
            /**
             * Rotate by index
             */
            this.rotate(index);
        } else {
            throw new Error(`Unable to set initial position on Rotor: ${this.name} using parameter: "${arg}"`);
        }
    }
    /*----------------------------------------------------------*/
    /**
     * Rotate Ring forward or backward
     * 
     * @param {int} n Number of rotations
     * @param {boolean} forward Default: true
     * 
     * @returns {void}  Assigns:
     * - Wiring
     * - Fixed alphabet
     */
    /*----------------------------------------------------------*/
    rotate(n=1, forward=true){
        /**
         * Rotate FIXED array:
         * - Copy
         * - Loop n
         * - Assign
         */
        const copy_fixed = [...this.fixed];
        /**
         * Loop n:
         * - Forward
         * - Reverse
         */
        if(forward === true){
            for(let i = 0; i < n; i++){
                /**
                 * Save previous head position
                 */
                this.prevHead = this.getHead();
                /**
                 * Rotate Fixed Array
                 */
                const shifted = copy_fixed.shift();
                copy_fixed.push(shifted);
            }
        } else if(forward === false){
            for(let i = 25; i >= n; i--){
                /**
                 * Save previous head position
                 */
                //this.prevHead = this.getHead();
                /**
                 * Rotate Fixed Array
                 */
                const shifted = copy_fixed.shift();
                copy_fixed.push(shifted);
            }
        }
        /**
         * Rotate WIRING array:
         * - Copy
         * - Loop n
         * - Assign
         */
        const copy_wiring = [...this.wiring];
        /**
         * Loop n:
         * - Forward
         * - Reverse
         */
        if(forward === true){
            for(let i = 0; i < n; i++){
                const shifted = copy_wiring.shift();
                copy_wiring.push(shifted);
            }
        } else if(forward === false){
            for(let i = 25; i >= n; i--){
                const shifted = copy_wiring.shift();
                copy_wiring.push(shifted);
            }
        }
        /**
         * Assign Both
         */
        this.fixed  = copy_fixed;
        this.wiring = copy_wiring;
    }
    /*----------------------------------------------------------*/
    /**
     * Forward
     * 
     * @param {int} signal
     * @returns {int} Output signal
     */
    /*----------------------------------------------------------*/
    forward(signal){
        /**
         * Validate
         */
        if(!validate_signal(signal)){
            throw new Error('Unable to validate signal in Rotor.forward()!');
        }
        /**
         * Get output signal
         */
        const input_char    = this.wiring[signal];
        const output_signal = this.fixed.indexOf(input_char);
        /**
         * Log
         */
        this.log = log_io(input_char, get_fixed_char(output_signal));
        /**
         * Validate and return
         */
        return output_signal;
    }
    /*----------------------------------------------------------*/
    /**
     * Backward
     * 
     * @param {int} signal Input signal
     * @returns {int} Output signal 
     */
    /*----------------------------------------------------------*/
    backward(signal){
        /**
         * Validate
         */
        if(!validate_signal(signal)){
            throw new Error('Unable to validate signal! in Rotor.backward()');
        }
        /**
         * Get output signal
         */
        const input_char    = this.fixed[signal];
        const output_signal = this.wiring.indexOf(input_char);
        /**
         * Log
         */
        this.log = log_io(input_char, get_fixed_char(output_signal), false, this.log);
        /**
         * Validate and return
         */
        return output_signal;
    }
}