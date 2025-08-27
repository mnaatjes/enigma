/**
 * @typedef {object} RotorConfiguration
 * @property {string} name - The wiring configuration for the rotor.
 * @property {string} position - The initial position of the rotor.
 * @property {string} ringSetting - The initial position of the rotor.
 */

/**
 * @typedef {object} EnigmaConfiguration
 * @property {object} plugboard - Key: Value pairs of characters
 * @property {RotorConfiguration[]} rotors - An array of rotor configurations.
 * @property {string} reflector - The reflector configuration by name
 */

/**
 * Import Components
 */
import { Keyboard } from "./components/Keyboard.js";
import { Plugboard } from "./components/Plugboard.js";
import { Rotor } from "./components/Rotor.js";
import { Reflector } from "./components/Reflector.js";

/**
 * EnigmaMachine
 * 
 * @class
 * 
 * @since 1.0.0:
 * - Created
 * 
 * @version 1.0.0
 * 
 */
export class EnigmaMachine {
    /**
     * Constructor
     * @param {EnigmaConfiguration} config - Configuration for entire machine
     */
    constructor(config={
        plugboard: {},
        rotors: [],
        reflector: ""
    }){
        // Define Components
        this.keyboard   = new Keyboard();
        this.plugboard  = new Plugboard(config.plugboard);
        this.rotors     = {
            r1: new Rotor(config.rotors[0]),
            r2: new Rotor(config.rotors[1]),
            r3: new Rotor(config.rotors[2]),
        };
        this.reflector = new Reflector();
    }

    /**
     * Encode
     * @param {string} inputChar
     */
    encode(inputChar){
        // Flow
        
    }
}