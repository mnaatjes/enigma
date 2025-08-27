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
        this.reflector = new Reflector(config.reflector);
    }

    /**
     * Encrypt
     * @param {string} inputChar
     */
    encrypt(inputChar){
        /**
         * @const {object} encryption
         */
        const encryption = {
            forward: {
                input: undefined,
                keyboard: undefined,
                plugboard: undefined,
                r1: undefined,
                r2: undefined,
                r3: undefined
            },
            reflector: {reflected: undefined},
            backward: {
                r3: undefined,
                r2: undefined,
                r1: undefined,
                plugboard: undefined,
                keyboard: undefined,
                output: undefined
            }
        }
        /**
         * Encryption Flow:
         * - Convert to Signal via Keyboard
         * - Plugboard
         */
        encryption.forward.input = inputChar;
        
        // Keyboard character to signal conversion
        let signal = this.keyboard.forward(inputChar);
        encryption.forward.keyboard = signal;

        // Plugboard encryption
        signal = this.plugboard.forward(signal);
        encryption.forward.plugboard = signal;

        // Rotor 1
        signal = this.rotors.r3.forward(signal);
        encryption.forward.r3 = signal;

        // Rotor 2
        signal = this.rotors.r2.forward(signal);
        encryption.forward.r2 = signal;

        // Rotor 3
        signal = this.rotors.r1.forward(signal);
        encryption.forward.r1 = signal;

        // Reflector
        signal = this.reflector.reflect(signal);
        encryption.reflector.reflected = signal;

        // Rotor 3
        signal = this.rotors.r1.backward(signal);
        encryption.backward.r1 = signal;

        // Rotor 2
        signal = this.rotors.r2.backward(signal);
        encryption.backward.r2 = signal;

        // Rotor 1
        signal = this.rotors.r3.backward(signal);
        encryption.backward.r3 = signal;

        // Plugboard
        signal = this.plugboard.backward(signal);
        encryption.backward.plugboard = signal;

        // Keyboard
        const output = this.keyboard.backward(signal);
        encryption.backward.keyboard = output;
        encryption.backward.output = output;

        // Output

        console.table(encryption);
        
    }
}