import { ALPHABET, ROTOR_CONFIGURATIONS } from "../constants.js";

/**
 * Represents a single rotor of the Enigma Machine
 * @class Rotor
 * 
 * @since 1.0.0: Created - depreciated
 * @since 2.0.0: 
 * - Restructured
 * 
 * @since 2.1.0:
 * - Coding Cassowary Implementation
 * 
 * @version 2.1.0
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
     * Details for debugging
     * @type {object} details
     * @property {string} details.name - Rotor name, e.g. I
     * @property {string} details.ring - Alphabet Ring array as joined string
     * @property {string} details.wiring - Rotor wiring array as joined string
     * @property {string} details.notch - Character default notch, e.g. "Q"
     */
    details = {};

    /**
     * The active configuration and state of the rotor and its properties
     * @type {object}
     * @property {string} state.name - The name of the rotor (e.g., "I", "II", "III").
     * @property {string} state.ringPosition - The position of the rotor's alphabet ring (e.g. "A")
     * @property {string} state.ringSetting - The ring setting (Ringstellung) of the rotor (e.g. "B")
     * @property {number} state.offset - Numeric offset from initial position relative to Fixed alphabet (e.g. n=1 rotation === offset of 1)
     */
    state = {};

    /**
     * Left
     * Alphabet Ring Array for rotor a.k.a Left Side
     * @type {array}
     */
    alphabetRing = [...ALPHABET];

    /**
     * Left
     * Fixed reference alphabet for indexes A-Z in order with index 0 always == "A"
     * @type {array}
     */
    static FIXED = [...ALPHABET];

    /**
     * Right
     * Wiring Array for cypther a.k.a Right side
     * @type {array} wiring
     */
    wiring = [];

    /**
     * Notch associated with initial wiring diagram - prior to any changes
     * @type {string} notch
     * @example "Q" for ROTOR I
     */
    notch;

    /**-------------------------------------------------------------------------*/
    /**
     * Constructor
     * 
     * @param {object} rotor_configuration
     */
    constructor(rotor_configuration){
        // Configure and Update
        this.update(rotor_configuration);
    }

    /**-------------------------------------------------------------------------*/
    /**
     * Rotate the rotor by n positions
     * 
     * @param {number} n Number of positions to advance or turn. Default = 1
     * @param {boolean} forward Direction in which to rotate. Default is forward
     * @returns {void}
     */
    rotate(n=1, forward=true){
        // Copy Alphabet Ring and Wiring Arrays
        const copyAlphabetRing  = [...this.alphabetRing];
        const copyWiring        = [...this.wiring];

        /**
         * Determine direction of Rotation
         */
        if(forward === false){
            // Reverse Rotation
            for(let i=0; i < n; i++){
                // Pop from end
                const poppedAlphabet = copyAlphabetRing.pop();
                const poppedWiring   = copyWiring.pop();

                // Unshift
                copyAlphabetRing.unshift(poppedAlphabet);
                copyWiring.unshift(poppedWiring);
            }
        } else if(forward === true){
            // Forward Rotation
            for(let i=0; i < n; i++){
                // Pop from end
                const shiftedAlphabet = copyAlphabetRing.shift();
                const shiftedWiring   = copyWiring.shift();

                // Unshift
                copyAlphabetRing.push(shiftedAlphabet);
                copyWiring.push(shiftedWiring);
            }
        }

        // Set values
        this.alphabetRing   = copyAlphabetRing;
        this.wiring         = copyWiring;

        // Store state properties
        this.state.ringPosition = this.alphabetRing[0];
        this.state.rotations    = (this.state.rotations === undefined) ? n : this.state.rotations + n;

        // Update details
        this.details.ring   = this.alphabetRing.join(" ");
        this.details.wiring = this.wiring.join(" ")
    }

    /**-------------------------------------------------------------------------*/
    /**
     * Set Rotor Setting (Ringsellung)
     * - Creates the offset integer
     * - Moves the Alphabet Ring relative to the wiring assembly
     * - Uses dotPosition of character in wiring array
     */
    setRingSetting(letter="A"){
        // Convert letter to index
        const n = Rotor.FIXED.indexOf(letter);


        // Rotate rotor backwards
        this.rotate(n, false);

        // Adjust turnover notch in relationship to the wiring
        const notchIndex = Rotor.FIXED.indexOf(this.notch);
        this.notch = Rotor.FIXED[(notchIndex - n) % 26];

        // Update state offset
        this.state.offset = n;
    }

    /**-------------------------------------------------------------------------*/
    /**
     * Set Starting position:
     * - This is the character that is visible in the window
     * - This moves the entire assembly (alphabet ring and wiring) together
     * 
     * @param {string} letter - Character to set in the window as the start position; Default "A"
     * @returns {void} - Rotates this.aphabetRing to input letter with this.wiring as one unit
     */
    setStartPosition(letter="A"){
        /**
         * @const {number} n - number of rotations needed to arrive at letter
         */
        const n = Rotor.FIXED.indexOf(letter);
        this.rotate(n);
    }

    /**-------------------------------------------------------------------------*/
    /**
     * Forward
     * 
     * @param {number} signal - Index value of the input character
     * @returns {number} - Index value of the output character
     */
    forward(signal){
        // Find character from signal int
        const letter = this.wiring[signal];

        // Encode using plugboard swapped keys
        return this.alphabetRing.indexOf(letter);
    }

    /**-------------------------------------------------------------------------*/
    /**
     * Backward
     * 
     * @param {number} signal - Index value of the input character
     * @returns {number} - Index value of the output character
     */
    backward(signal){
        // Find character from signal int
        const letter = this.alphabetRing[signal];

        // Encode using plugboard swapped keys
        return this.wiring.indexOf(letter);
    }

    /**-------------------------------------------------------------------------*/
    /**
     * Update Configuration
     * 
     * @param {object} config
     */
    update(config){
        // Define Init Configuration
        this.configuration = config;

        // Define wiring & notch
        this.wiring = [...ROTOR_CONFIGURATIONS[this.configuration.name].wiring];
        this.notch  = ROTOR_CONFIGURATIONS[this.configuration.name].notch;

        // Set state variables
        this.state.name = config.name

        // Rotate to start position
        this.setStartPosition(this.configuration.position);

        // Set Ring Setting
        this.setRingSetting(this.configuration.ringSetting);

        // Assign Details
        this.details = {
            name: this.state.name,
            ring: this.alphabetRing.join(" "),
            wiring: this.wiring.join(" "),
            notch: this.notch
        };
    }
}