/**
 * Imports
 */
import { Plugboard } from "./Plugboard.js";
import { Reflector } from "./Reflector.js";
import { Rotor } from "./Rotor.js";
import { Keyboard } from "../test/components/Keyboard.js";
import { get_fixed_char } from "../test/utils/get_fixed_character.js";
import { get_fixed_index } from "../test/utils/get_fixed_index.js";
import { validate_char } from "../test/utils/validate_char.js";
import { validate_signal } from "../test/utils/validate_signal.js"; 
import { log_io } from "../utils/log_io.js";
import { ROTOR_PROPS, REFLECTOR_PROPS } from "../constants.js";

/*----------------------------------------------------------*/
/**
 * @class EnigmaMachine
 * @memberof Enigma
 * 
 * @version 2.2
 * @since 1.0   Created
 * @since 2.0   Reset and Consolidated
 * @since 2.1   Additions:
 * - Added validation to message
 * - Consolidated settings, PROPS constants into EnigmaMachine
 * @since 2.2   Updates:
 * - Migrated to main
 * - Renamed file EnigmaMachine.js
 * - Migrated static properties to constants.js
 * - Consolidated settings parsing / validation into this class (removed from subclasses)
 * - Created update() method
 * - Removed setInitialRings() and migrated to Rotors class
 */
/*----------------------------------------------------------*/
export class EnigmaMachine {
    
    /**
     * Settings for all Enigma objects and properties
     * @type {object}
     */
    settings;
    
    /**
     * Rotors
     * @type {array}
     */
    rotors;
    
    /**
     * Reflector
     * @type {object}
     */
    reflector;
    
    /**
     * Plugboard
     * @type {object}
     */
    plugboard;
    
    /**
     * Keyboard
     * @type {object}
     */
    keyboard;

    /**
     * Log of input output for entire encryption
     * @type {object}
     */
    log;

    /**
     * Counts the number of encryptions (by character) for each session
     * @type {int}
     */
    count = 0;
    
    /**
     * Boolean determining if the EnigmaMachine has been initialized
     * @type {boolean}
     */
    isInitialized = false;

    /**
     * Debug object of debugging methods
     * @type {object}
     * @since 2.2 Created to aid in debugging
     */
    debug;

    /**
     * Object containing the current state information of all components
     * @type {EnigmaState}
     * 
     * @since 2.1   Created
     * @since 2.2   Modified:
     * - Made a getter
     */
    get state(){
        const reversed = [...this.rotors];
        reversed.reverse();
        return {
            plugboard: this.plugboard.connections,
            rotors: {
                positions: reversed.map(rotor => rotor.getHead()),
                rings: reversed.map(rotor => rotor.ring_setting),
                notches: reversed.map(rotor => rotor.notch),
                names: reversed.map(rotor => rotor.name),
            },
            reflector: this.reflector.name
        };
    }
    
    /*----------------------------------------------------------*/
    /**
     * @constructor
     * 
     * @since 2.2 Modified and rewritten
     * 
     * @param {object|undefined} config
     */
    /*----------------------------------------------------------*/
    constructor(config){
        /**
         * Update from config
         */
        this.update(config);
        /**
         * Init Debugging Methods
         */
        this.debug = {
            /**
             * Displays the arrays of every Enigma component
             * @function showArrays
             * @param {void}
             * @returns {void}
             */
            showRotors: () => {
                console.log(
                    " Rotors:", this.rotors.map(rotor => rotor.name).join(", "), "\n", 
                    "   POS:", this.rotors.map((rotor) => {
                        return rotor.getHead();
                    }).join(", "), "\n",
                    " NOTCH:", this.rotors.map((rotor) => {
                        return rotor.notch;
                    }).join(", "), "\n",
                    "  RING:", this.rotors.map((_, i) => {
                        return config.ringstellung.ring_settings[i]
                    }).join(", "), "\n",
                );
            },
            showIO: () => {
                console.log(
                    ` PB: ${this.plugboard.log.forward.input} => ${this.plugboard.log.forward.output}`, "\n",
                    "ROTORS:", 
                    this.rotors.map((rotor) => {
                    return `${rotor.name}: ${rotor.log.forward.input} => ${rotor.log.forward.output}`;    
                    }).join(" | "),
                    "\n",
                    `REF: ${this.reflector.log.forward.input} => ${this.reflector.log.forward.output}`, "\n",
                    "ROTORS:", 
                    [...this.rotors].reverse().map((rotor) => {
                    return `${rotor.name}: ${rotor.log.forward.input} => ${rotor.log.forward.output}`;    
                    }).join(" | "),
                    "\n",
                    `PB: ${this.plugboard.log.backward.input} => ${this.plugboard.log.backward.output}`
                );
            },
        };
    }
    /*----------------------------------------------------------*/
    /**
     * Update Enigma Machine configuration and all components:
     * - Validate and parse configuration
     * - Assign properties
     * - Update Components
     * 
     * @param {object} config
     * @returns {void} Assigns properties
     */
    /*----------------------------------------------------------*/
    update(config){
        /**
         * Validate and assign config property
         */
        this.config = this.#validateConfig(config);
        /**
         * Parse and apply settings
         */
        const settings = this.#parseConfig(this.config);
        /**
         * Update Components:
         * - Check if initialized
         * - Assign if not initialized
         * - Update if existing
         */
        if(this.isInitialized === false){
            /**
             * Assign Components
             */
            this.keyboard   = new Keyboard(settings.keyboard);
            this.plugboard  = new Plugboard(settings.plugboard);
            this.rotors     = settings.rotors.map((rotor_settings) => {
                return new Rotor(rotor_settings);
            });
            this.reflector = new Reflector(settings.reflector);
            /**
             * Update initialized bool
             */
            this.isInitialized = true;
            /**
             * TODO: Initialize HTML Component
             */
        } else {
            /**
             * Update Existing Enigma Components
             */
            this.keyboard.update(settings.keyboard);
            this.plugboard.update(settings.plugboard);
            this.rotors.forEach((rotor, index) => {
                rotor.update(settings.rotors[index]);
            });
            this.reflector.update(settings.reflector);
            /**
             * Reset count
             */
            this.count = 0;
            /**
             * TODO: Update HTML Component
             */
        }
    }
    /*----------------------------------------------------------*/
    /**
     * Validates configuration object
     * @param {object} config Configuration for ALL Enigma components
     * @returns {object} Validated object
     */
    /*----------------------------------------------------------*/
    #validateConfig(config){
        /**
         * TODO: Validate
         */
        return config;
    }
    /*----------------------------------------------------------*/
    /**
     * Parses config object into settings object
     * @param {object} config
     * @returns {object} Settings for all Enigma components
     */
    /*----------------------------------------------------------*/
    #parseConfig(config){
        /**
         * Return parsed information
         */
        return {
            /**
             * Rotor settings 
             * @property {array<rotor: string, init_position: string, ring_setting: string>} ringstellung
             */
            rotors: 
            Array.from({length: config.ringstellung.rotors.length}).reduce((acc, _, i) => {
                // Render Properties Objects
                const obj = Object.entries(config.ringstellung).reduce((obj, props) => {
                    // Props
                    const key    = props[0].slice(0, -1);
                    const values = [...props[1]].reverse();
                    // Assign
                    if(key === "rotor"){
                        obj["name"]     = values[i];
                        obj["wiring"]   = ROTOR_PROPS[values[i]].wiring;
                        obj["notch"]    = ROTOR_PROPS[values[i]].notch;
                        obj["order"]    = i;
                    } else {
                        obj[key] = values[i];
                    }
                    // Return
                    return obj;
                }, {});
                // Push
                acc.push(obj);
                // Return accumulator
                return acc;
            }, []),
            /**
             * @property {object<name: string, wiring: array>} reflector
             */
            reflector: {
                name: config.reflector,
                wiring: REFLECTOR_PROPS[config.reflector]
            },
            /**
             * Plugboard
             * @property {object} plugboard Connections object
             */
            plugboard: config.plugboard
        };
    }
    /*----------------------------------------------------------*/
    /**
     * Step rotors
     * 
     * @private
     * @since 2.2   Updates:
     * - Made private
     * - Changed debugging
     */
    /*----------------------------------------------------------*/
    #stepRotors(){
        /**
         * Checks all rotors for their notch-state (if the head character is at its notch character)
         * @type {array}
         */
        const atNotch = this.rotors.map(rotor => rotor.getHead() === rotor.notch);
        /**
         * Determine Conditions for Rotation:
         * - Check Rightmost and Middle notch
         * - Double-step Anomaly
         * - Rightmost notch
         * - Step Rightmost every keypress
         */
        if(atNotch[0] && atNotch[1]){
            // Rotate all 3
            this.rotors.map(rotor => rotor.rotate());
        /**
         * Check for Double-Step Anomaly in Middle
         */
        } else if(atNotch[1]){
            // Step all 3
            this.rotors.map(rotor => rotor.rotate());
        /**
         * Check Rightmost notch
         */
        } else if(atNotch[0]){
            // Rotate Rightmost and Middle
            this.rotors[0].rotate();
            this.rotors[1].rotate();
        /**
         * Rightmost stepping every keypress
         */
        } else {
            // Rotate Rightmost
            this.rotors[0].rotate();
        }
    }
    /*----------------------------------------------------------*/
    /**
     * Encrypt character using all Enigma components
     * 
     * @since 2.1   Updates:
     * - Accepts strings only!
     * - Validation added
     * - Parsing
     * 
     * @since 2.2   Updates:
     * - Retooled logging
     * - Changed from message to individual character encryption
     * 
     * @uses Reflector
     * @uses Rotor
     * @uses Plugboard
     * @uses Keyboard
     * 
     * @param {string} letter
     * 
     * @returns {string} Encrypted character
     */
    /*----------------------------------------------------------*/
    encrypt(letter){
        /**
         * Validate that EnigmaMachine has been initialized
         */
        if(this.isInitialized === false){
            throw new Error('Enigma Machine has NOT been initialized! Cannot proceed!');
        }
        /**
         * Validate incoming character
         */
        if(!validate_char(letter)){
            throw new TypeError(`Input Letter "${letter}" is invalid! at EnigmaMachine.encrypt()`);
        }
        const input_char = letter.toUpperCase();
        /**
         * Step Rotors
         */
        this.#stepRotors();
        /**
         * Signal containing index int of encryption
         * @type {string|undefined}
         */
        let signal = undefined;
        /**
         * Perform Encryption
         */
        signal = this.forward(input_char);
        signal = this.reflector.reflect(signal);
        signal = this.backward(signal);
        /**
         * Convert to character
         */
        const output_char = signal;
        /**
         * Log
         */
        this.log = log_io(input_char, output_char);
        /**
         * Increment Count
         */
        this.count++;
        /**
         * Return encrypted output character
         */
        return output_char;
    }
    /*----------------------------------------------------------*/
    /**
     * Forward
     * 
     * @param {string} letter
     */
    /*----------------------------------------------------------*/
    forward(letter){
        /**
         * Validate
         */
        const char = validate_char(letter) ? letter : null;
        let signal = undefined;
        if(char === null){
            throw new Error(`Character "${letter}" in EnigmaMachine.forward() in invalid!`);
        }
        /**
         * Declare Properties
         */
        const rotors = [...this.rotors];
        /**
         * Perform Encryption
         */
        signal = this.keyboard.forward(char);
        signal = this.plugboard.forward(signal);
        // Loop rotors
        signal = rotors.reduce((acc, rotor) => {
            //Perform logic
            acc = rotor.forward(acc);
            // return signal
            return acc;
        }, signal);
        /**
         * Return signal
         */
        return signal;
    }
    /*----------------------------------------------------------*/
    /**
     * Backward
     */
    /*----------------------------------------------------------*/
    backward(index){
        /**
         * Validate
         */
        index = validate_signal(index) ? index : null;
        if(index === null){
            throw new Error(`Input signal "${index}" is not a valid Signal Index!`);
        }
        /**
         * Declare Props
         */
        const rotors = [...this.rotors].reverse();
        let signal   = index;
        /**
         * Perform Encryption
         */
        signal = rotors.reduce((acc, rotor) => {
            //Perform logic
            acc = rotor.backward(acc);
            // return signal
            return acc;
        }, signal);
        // Plugboard
        signal = this.plugboard.backward(signal);
        // Keyboard int --> char
        signal = this.keyboard.backward(signal);
        /**
         * Return Signal
         */
        return signal;
    }
}