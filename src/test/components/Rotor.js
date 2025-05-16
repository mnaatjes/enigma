/**
 * @memberof Enigma
 */

import { ALPHABET, DEBUG, ROTOR_PROPS } from "../constants.js";
import { get_fixed_char } from "../utils/get_fixed_character.js";
import { get_fixed_index } from "../utils/get_fixed_index.js";
import { validate_char } from "../utils/validate_char.js";
import { validate_signal } from "../utils/validate_signal.js";

export class Rotor {
    /**
     * Settings
     * @type {object}
     */
    settings;
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
    /*----------------------------------------------------------*/
    /**
     * 
     * @param {object} settings
     */
    /*----------------------------------------------------------*/
    constructor(settings={}){
        this.settings   = settings;
        this.name       = settings.name;
        this.wiring     = this.settings.wiring;
        this.notch      = this.settings.notch;
        this.order      = this.settings.order;
    }
    /*----------------------------------------------------------*/
    /**
     * Forward
     */
    /*----------------------------------------------------------*/
    forward(signal){
        /**
         * Validate
         */
        if(!validate_signal(signal)){
            throw new Error();
        }
        /**
         * Get output signal
         */
        const input_char    = this.wiring[signal];
        const output_signal = this.fixed.indexOf(input_char);
        /**
         * Validate and return
         */
        return output_signal;
    }
    /*----------------------------------------------------------*/
    /**
     * Backward
     */
    /*----------------------------------------------------------*/
    backward(signal){
        /**
         * Validate
         */
        if(!validate_signal(signal)){
            throw new Error();
        }
        /**
         * Get output signal
         */
        const input_char    = this.fixed[signal];
        const output_signal = this.wiring.indexOf(input_char);
        /**
         * Validate and return
         */
        return output_signal;
    }
    /*----------------------------------------------------------*/
    /**
     * Shows current rotors
     */
    /*----------------------------------------------------------*/
    show(){
        console.log(this.fixed.join(""));
        console.log(this.wiring.join(""));
        console.log('');
    }
    /*----------------------------------------------------------*/
    /**
     * Rotate
     * 
     * @param {int} n Number of rotations
     * @param {boolean} forward Default: true
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
                const shifted = copy_fixed.shift();
                copy_fixed.push(shifted);
            }
        } else if(forward === false){
            for(let i = 25; i >= n; i--){
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
         * Debugging
         */
        if(DEBUG.setRings){
            if(forward === false){
                console.log(copy_fixed.join(""));
                console.log(copy_wiring.join(""));
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
     * Set ring
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
        console.log(
            " Name:    ", this.name, "\n",
            "Ring:    ", this.settings.ring_setting, "\n",
            "Position:", this.getHead(), "-->", this.settings.init_position, "\n",
            "Notch:   ", this.notch, "-->", notch
        )
        this.notch = notch;
        
    }
    /*----------------------------------------------------------*/
    /**
     * Rotate to letter index
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
     * Get Current or Head of rotor
     */
    /*----------------------------------------------------------*/
    getHead(){return this.fixed[0];}
    /*----------------------------------------------------------*/
}