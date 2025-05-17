/**
 * @memberof Enigma
 */
import { EnigmaMachine } from "./Enigma.js";
import { ALPHABET, DEBUG } from "../constants.js";
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
    constructor(settings={}){
        this.settings   = settings;
        this.name       = settings.name;
        this.wiring     = this.settings.wiring;
        this.notch      = this.settings.notch;
        this.order      = this.settings.order;
        this.prevHead   = this.getHead();
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
         * Log
         */
        this.#log(signal, output_signal);
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
         * Log
         */
        this.#log(signal, output_signal, false);
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
        /**
         * Debugging
         */
        if(DEBUG.setRings){
            console.log(
                " Name:    ", this.name, "\n",
                "Ring:    ", this.settings.ring_setting, "\n",
                "Position:", this.getHead(), "-->", this.settings.init_position, "\n",
                "Notch:   ", this.notch, "-->", notch
            )
        }
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
                /*
                backward: {},
                position: this.getHead(),
                ring: this.settings.ring_setting,
                notch: this.notch,
                atNotch: this.getHead() === this.notch,
                wiring: this.wiring.join(""),
                fixed: this.fixed.join("")
                */
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
}