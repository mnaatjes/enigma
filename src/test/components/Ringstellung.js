/**
 * @import
 */
import { DEBUG, FIXED } from "../constants.js";
import { Rotor } from "./Rotor.js";
/*----------------------------------------------------------*/
/**
 * Default Rotor Settings:
 * - Rotors
 * - Initial Positions
 * - Ring Settings
 * 
 * @readonly
 * @type {object}
 */
/*----------------------------------------------------------*/
const DEFAULT_ROTOR_SETTINGS = {
    rotors: ["III", "II", "I"],
    positions: ["A", "A", "B"],
    ring_settings: ["A", "A", "Z"]
};
/*----------------------------------------------------------*/
/**
 * Ringstellung - [Rotors] Ring Setting:
 * - Contains all of the constants associated with Rotor Settings
 * 
 * @class
 * @memberof Enigma
 * @version 2.0
 */
export class Ringstellung {
    /**
     * Fixed Alphabet:
     * - Never changes and never can be changed
     * - Meant as a static, fixed reference
     * 
     * @readonly
     * @type {array}
     */
    static ALPHABET = FIXED;
    /**
     * Rotors Properties
     * 
     * @readonly
     * @type {object<string: object<array, string>>}
     */
    static ROTOR_PROPS = {
        "I": {
            wiring: "EKMFLGDQVZNTOWYHXUSPAIBRCJ".split(""),
            notch: "Q"
        },
        "II": {
            wiring: "AJDKSIRUXBLHWTMCQGZNPYFVOE".split(""),
            notch: "E"
        },
        "III": {
            wiring: "BDFHJLCPRTXVZNYEIWGAKMUSQO".split(""),
            notch: "V"
        },
        "IV": {
            wiring: "ESOVPZJAYQUIRHXLNFTGKDCMWB".split(""),
            notch: "J"
        },
        "V": {
            wiring: "VZBRGITYUPSDNHLXAWMJQOFECK".split(""),
            notch: "Z"
        },
        "VI": {
            wiring: "JPGVOUMFYQBENHZRDKASXLICTW".split(""),
            notch: "ZM"
        },
        "VII": {
            wiring: "NZJHGRCXMYSWBOUFAIVLPEKQDT".split(""),
            notch: "ZM"
        },
        "VII": {
            wiring: "FKQHTLXOCBJSPDZRAMEWNIUYGV".split(""),
            notch: "ZM"
        },
    };
    /**
     * Settings: parsed from parameter and validated
     * 
     * @type {object}
     */
    settings;
    /**
     * Rotors
     * @type {array}
     */
    rotors;
    /*----------------------------------------------------------*/
    /**
     * @constructor
     * 
     * @param {object} settings 
     * @param {HTMLElement} parent 
     */
    /*----------------------------------------------------------*/
    constructor(settings=DEFAULT_ROTOR_SETTINGS, parent=null){
        // Parse Settings
        this.settings   = this.#validateSettings(settings);
        // Set rotors
        this.rotors     = this.#setRotors();
    }
    /*----------------------------------------------------------*/
    /**
     * Validates settings parameter and returns settings object on success
     * 
     * @returns {object}
     * @throws {TypeError} Parameter not an object
     * @throws {RangeError} Improper or Invalid Rotor Key | Reflector Key | Setting or Position Character
     */
    /*----------------------------------------------------------*/
    #validateSettings(settings){
        /**
         * Validate Keys
         */
        /**
         * Validate 3 rotors and that keys exist
         */

        return settings;
    }
    /*----------------------------------------------------------*/
    /**
     * Set Rotors from settings
     * @uses this.settings
     */
    /*----------------------------------------------------------*/
    #setRotors(){
        /**
         * Parsing Settings:
         * - Declare results array
         * - Order defined by array order of settings.rotors
         * - Settings.rotors represents the rotor order from left to right:
         */
        /**
         * @type {array}
         */
        const results = [];
        /**
         * Invert settings so that they are in the right order
         * - Rightmost rotor entered into array first
         */
        const ordered = {
            rotors: [...this.settings.rotors].reverse(),
            positions: [...this.settings.positions].reverse(),
            ring_settings: [...this.settings.ring_settings].reverse()
        };
        /**
         * Loop settings.rotors
         */
        ordered.rotors.forEach((name, order) => {
            /**
             * Apply Rotor:
             * - Instantiate new Rotor object
             * - Assign parameters
             * - Push to results array
             * - TODO: Change how parameters are fed to just a settings object
             */
            results.push(new Rotor(
                Ringstellung.ROTOR_PROPS[name].wiring,
                Ringstellung.ROTOR_PROPS[name].notch,
                name,
                order,
                ordered.positions[order],
                ordered.ring_settings[order]
            ));
            /**
             * Assign helping properties to Ringstellung object:
             */
        });
        /**
         * Validate Results:
         * - Check size
         * - Check all instances
         */
        /**
         * Return results array
         */
        return results;
    }
    /*----------------------------------------------------------*/
    /**
     * Helper Method: Validates signal (character) coming in
     * 
     * @param {string} value
     * 
     * @returns {string} Character string
     * @throws {TypeError} Is Numeric | Non-alphabetical
     * @throws {RangeError} Longer than 1 character
     */
    /*----------------------------------------------------------*/
    #validateSignal(value){
        /**
         * Type:
         * - String
         * - Length
         * - Non-numeric
         * - Alphabetical
         */
        if(typeof value !== 'string'){
            throw new TypeError('Signal value must be of type "String"!');
        }
        if(value.length > 1){
            throw new RangeError('Signal value must be 1 character in length!');
        }
        if(!isNaN(value) || !(/^[a-zA-Z]$/.test(value))){
            throw new RangeError(`Signal value: "${value}" must be an alphabetical letter!`);
        }
        /**
         * Format and Return:
         * - To Upper Case
         * - Return formatted character
         */
        return value.toUpperCase();
    }
    /*----------------------------------------------------------*/
    /**
     * Step rotors
     */
    /*----------------------------------------------------------*/
    stepRotors(){
        /**
         * Step first rotor always
         */
        this.rotors[0].rotate();
        /**
         * Loop first 2 rotors
         */
        for(let i = 0; i < 2; i++){
            const rotor = this.rotors[i];
            const next  = this.rotors[i + 1];
            // Trigger Rotation
            if(rotor.atNotch()){
                next.rotate();
            }
        }
    }
    /*----------------------------------------------------------*/
    /**
     * Forwards:
     * Encrypt the first 3 rotors in the FORWARD Direction
     * - Handles ALL Rotation after initial setting within Rotor Object
     * 
     * @param {string} signal
     * @returns {string} Single character output from forward Encryption
     * @throws {TypeError, RangeError, Error}
     */
    /*----------------------------------------------------------*/
    forwards(signal){
        /**
         * Validate signal
         */
        const input = this.#validateSignal(signal);
        /**
         * Values container for each rotor
         * @type {string}
         */
        let value = undefined;
        /**
         * Step rotors
         */
        this.stepRotors();
        /**
         * Loop rotors in order
         */
        this.rotors.forEach((rotor) => {
            /**
             * Perform forward encryption on each rotor:
             * - Check input
             * - Check value
             */
            value = (value === undefined) ? rotor.forward(input) : rotor.forward(value);
            /**
             * Debug Positions
             */
            this.debugPositions();
        });
        /**
         * Debug Overview
         */
        this.debugOverview();
        /**
         * Validate output and return
         */
        if(typeof value !== 'string' || value.length > 1 || !isNaN(value)){
            throw new Error(`Output value from Ringstellung::forwards() is of invalid Type or Range!`);
        } else {
            return value.toUpperCase();
        }
    }
    /*----------------------------------------------------------*/
    /**
     * Backwards encryption (from Reflector to Leftmost to Rightmost)
     * 
     * @param {string} signal Input Character
     * 
     * @returns {string} Output Character
     * @throws {TypeError, RangeError, Error}
     */
    /*----------------------------------------------------------*/
    backwards(signal){
        /**
         * Validate signal
         */
        const input = this.#validateSignal(signal);
        /**
         * Values container for each rotor
         * @type {string}
         */
        let value = undefined;
        /**
         * Loop rotors and perform backwards encryption:
         * - MUST reverse order!
         * - Make copy
         */
        const copy = [...this.rotors];
        const reversed = copy.reverse();
        reversed.forEach((rotor, order) => {
            /**
             * Get output value from each rotor
             */
            value = (value === undefined) ? rotor.backward(input) : rotor.backward(value);
        });
        /**
         * Validate output and return
         */
        if(typeof value !== 'string' || value.length > 1 || !isNaN(value)){
            throw new Error(`Output value from Ringstellung::forwards() is of invalid Type or Range!`);
        } else {
            return value.toUpperCase();
        }
    }
    /*----------------------------------------------------------*/
    /**
     * Get current POSITION of all rotors
     * @returns {array<int>}
     */
    /*----------------------------------------------------------*/
    getPositionAll(){
        /**
         * Reverse order
         */
        const copy = [...this.rotors];
        /**
         * Capture and return
         */
        return copy.reverse().map((rotor) => {
            return rotor.position;
        });
    }
    /*----------------------------------------------------------*/
    /**
     * Get current CHARACTER of all rotors
     * @returns {array<string>}
     */
    /*----------------------------------------------------------*/
    getCurrentAll(){
        /**
         * Reverse order
         */
        const copy = [...this.rotors];
        /**
         * Capture and return
         */
        return copy.reverse().map((rotor) => {
            return rotor.getCurrent();
        });
    }
    /*----------------------------------------------------------*/
    /**
     * Get Rotations
     */
    /*----------------------------------------------------------*/
    getRotations(){
        /**
         * Reverse order
         */
        const copy = [...this.rotors];
        /**
         * Capture and return
         */
        return copy.reverse().map((rotor) => {
            return rotor.rotations;
        });
    }
    /*----------------------------------------------------------*/
    /**
     * Debugging Method: Logs current position of all rotors
     * @param {void}
     * @return {void}
     */
    /*----------------------------------------------------------*/
    debugPositions(){
        if(DEBUG.all || DEBUG.ringstellung.all || DEBUG.ringstellung.positions){
            console.error(
                this.getCurrentAll().join(", "),
            );
        }
    }
    /*----------------------------------------------------------*/
    /**
     * Show initial settings
     */
    /*----------------------------------------------------------*/
    debugSettings(){
        if(DEBUG.all || DEBUG.ringstellung.all || DEBUG.ringstellung.settings){
            console.error(
                "INIT POS:", this.settings.positions.join(" "),
                "RING SET:", this.settings.ring_settings.join(" ")
            )
        }
    }
    /*----------------------------------------------------------*/
    /**
     * Debug Overview
     */
    /*----------------------------------------------------------*/
    debugOverview(){
        const copy = [...this.rotors];
        copy.reverse();
        if(DEBUG.all || DEBUG.ringstellung.all || DEBUG.ringstellung.overview){
            console.error(
                "CURR:", this.getCurrentAll().join(", "),
                "\n",
                " ROT :", this.getRotations().join(", "),
            );
            console.log(this.rotors.map(obj => obj.signal + "-->" + obj.output).join(" | "));
            console.log(copy.map(obj => obj.notch + ": " + obj.atNotch()).join(" | "));
        }
    }
    /*----------------------------------------------------------*/
}