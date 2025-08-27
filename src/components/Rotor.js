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
     * @property {int} state.offset - Numeric offset from initial position relative to Fixed alphabet (e.g. n=1 rotation === offset of 1)
     * TODO Lead Character
     * TODO INT Value
     */
    state = {};

    /**
     * Alphabet Ring Array for rotor a.k.a Left Side
     * @type {array}
     */
    alphabetRing = ALPHABET;

    /**
     * Fixed reference alphabet for indexes A-Z in order with index 0 always == "A"
     * @type {array}
     */
    static FIXED = ALPHABET;

    /**
     * Wiring Array for cypther a.k.a Right side
     * @type {array} wiring
     */
    wiring = [];

    /**
     * Notch associated with initial wiring diagram - prior to any changes
     * @type {object} notch
     * @property {string} notch.char - Character present at notch which changes based on offset
     * @property {int} notch.index - Fixed alphabet based index of notch character
     * @example "Q" for ROTOR I
     */
    notch = {};

    /**
     * Offset created by the ring setting (Ringstellung) or rotation of the alphabet ring
     * - Default = 0
     * - Shifts the wiring array
     */
    offset = {rotation: 0, ring: 0};

    /**
     * Constructor
     */
    constructor(rotor_configuration){
        // Assign Initial Configuration
        this.configuration = rotor_configuration;
        
        // Set initial wiring and notch properties
        this.wiring = ROTOR_CONFIGURATIONS[this.configuration.name].wiring;
        this.notch  = {
            char: ROTOR_CONFIGURATIONS[this.configuration.name].notch,
            index: Rotor.FIXED.indexOf(ROTOR_CONFIGURATIONS[this.configuration.name].notch)
        };
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
        // Assign offset integer
        this.offset.rotation = (forward === true) ?
            n % ALPHABET.length :
            (n % ALPHABET.length) * -1;
        
        // Assign new notch character
        this.notch.char = Rotor.FIXED[this.notch.index - this.state.offset];
    }

    /**
     * Set Rotor Setting (Ringsellung)
     * - Creates the offset integer
     * - Moves the Alphabet Ring relative to the wiring assembly
     * - Uses dotPosition of character in wiring array
     * 
     * @param {string} character
     */
    setRingSetting(character="A"){
        // Calculate offset
        this.offset.ring = Rotor.FIXED.indexOf(character);

        // Shift alphabet ring
        const shiftedRing = [...this.alphabetRing];
        for(let i=0; i < this.offset.ring; i++){
            const char = shiftedRing.pop();
            shiftedRing.unshift(char);
        }
        // Assign to alphabet ring
        this.alphabetRing = shiftedRing;
    }

    /**
     * Set Starting position:
     * - This is the character that is visible in the window
     * - This moves the entire assembly (alphabet ring and wiring) together
     */
    setStartPosition(character="A"){
        // Calculate rotations
        const targetIndex = Rotor.FIXED.indexOf(character);
        // Rotate
        this.rotate(targetIndex);
    }

    /**
     * Forward
     */
    forward(character="A"){
        // Define signal
        let signal = this.alphabetRing.indexOf(character);
        return this.wiring[signal];
    }
}