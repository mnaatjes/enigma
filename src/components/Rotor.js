import { ALPHABET, ROTOR_CONFIGURATIONS } from "../../constants.js";

/**
 * Represents a single rotor of the Enigma Machine
 * @class Rotor
 * 
 * @since 1.0.0: Created - depreciated
 * @since 2.0.0: 
 * - Restructured
 * 
 * @version 2.0.0
 * 
 * @param {object} rotor_configuration - The configuration object for a single rotor.
 * @param {string} rotor_configuration.name - The name of the rotor (e.g., "I", "II", "III").
 * @param {string} rotor_configuration.position - The starting position of the rotor's alphabet ring.
 * @param {string} rotor_configuration.ringSetting - The ring setting (Ringstellung) of the rotor.
 */
export class Rotor {
    /**
     * The initial configuration settings for the rotor.
     * @type {object}
     * @property {string} configuration.name - The name of the rotor (e.g., "I", "II", "III").
     * @property {string} configuration.position - The starting position of the rotor's alphabet ring.
     * @property {string} configuration.ringSetting - The ring setting (Ringstellung) of the rotor.
     */
    configuration = {};

    /**
     * The active configuration and state of the rotor and its properties
     * @type {object}
     * @property {string} state.name - The name of the rotor (e.g., "I", "II", "III").
     * @property {string} state.ringPosition - The position of the rotor's alphabet ring (e.g. "A")
     * @property {string} state.ringSetting - The ring setting (Ringstellung) of the rotor (e.g. "B")
     * @property {int} state.offset - Numeric offset from initial position; index 0 = "A"
     * @property {string} state.notch - The current notch position (e.g.)
     * TODO Lead Character
     * TODO INT Value
     */
    state = {};

    /**
     * Fixed Alphabet Array for rotor a.k.a Left Side
     * @type {array} fixed
     */
    alphabetRing = ALPHABET;

    /**
     * Wiring Array for cypther a.k.a Right side
     * @type {array} wiring
     */
    wiring = [];

    /**
     * Notch associated with initial wiring diagram - prior to any changes
     * @type {string} notch
     * @example "Q" for ROTOR I
     */
    notch = "";

    /**
     * Constructor
     */
    constructor(rotor_configuration){
        // Assign Initial Configuration
        this.configuration = rotor_configuration;
        
        // Set initial wiring and notch properties
        this.wiring = ROTOR_CONFIGURATIONS[this.configuration.name].wiring;
        this.notch  = ROTOR_CONFIGURATIONS[this.configuration.name].notch;
    }

    /**
     * Rotate the rotor by n positions
     * 
     * @param {int} n Number of positions to advance or turn. Default = 1
     * @param {boolean} forward Direction in which to rotate. Default is forward
     * @returns {void}
     */
    rotate(n=1, forward=true){
        // Copy alphabet ring
        const copyAlphabetRing = [...this.alphabetRing];

        // Copy wiring array
        const copyWiring = [...this.wiring];

        // Determine direction of rotation
        if(forward === true){
            // Rotate Forwards
            for(let i = 0; i < n; i++){
                /**
                 * Rotate alphabetRing Copy:
                 * - shift first character off array
                 * - prepend shifted character onto array
                 */
                const shiftedCharAlphabet = copyAlphabetRing.shift();
                copyAlphabetRing.push(shiftedCharAlphabet);

                /**
                 * Rotate wiring copy:
                 * - shift off first char
                 * - prepent to array
                 */
                const shiftedCharWiring = copyWiring.shift();
                copyWiring.push(shiftedCharWiring);

            }
        } else {
            // Rotate Backwards
            for(let i = 25; i >= n; i--){
                /**
                 * Rotate alphabetRing Copy:
                 * - shift first character off array
                 * - prepend shifted character onto array
                 */
                const shiftedCharAlphabet = copyAlphabetRing.shift();
                copyAlphabetRing.push(shiftedCharAlphabet);

                /**
                 * Rotate wiring copy:
                 * - shift off first char
                 * - prepent to array
                 */
                const shiftedCharWiring = copyWiring.shift();
                copyWiring.push(shiftedCharWiring);
            }
        }
        // Assign rotor properties from rotated copies
        this.alphabetRing   = copyAlphabetRing;
        this.wiring         = copyWiring;

        // Update State properties
        this.state.offset = (forward === true) ? 
            (n +  ALPHABET.indexOf(this.alphabetRing[0])) % ALPHABET.length : 
            ((ALPHABET.indexOf(this.alphabetRing[0]) - n) % ALPHABET.length + ALPHABET.length) % ALPHABET.length;
        console.log(copyAlphabetRing.join(" "));
        console.log(copyWiring.join(" "));
        console.log(this.state);
        console.log(ALPHABET.indexOf(this.alphabetRing[0]));
    }
}