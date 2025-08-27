import { ALPHABET, ROTOR_CONFIGURATIONS } from "../../constants.js";

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
     * @property {int} state.offset - Numeric offset from initial position relative to Fixed alphabet (e.g. n=1 rotation === offset of 1)
     * TODO Lead Character
     * TODO INT Value
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

    /**
     * Offset created by the ring setting (Ringstellung) or rotation of the alphabet ring
     * - Default = 0
     * - Shifts the wiring array
     */
    offset;

    /**
     * Constructor
     */
    constructor(rotor_configuration){
        // Define Init Configuration
        this.configuration = rotor_configuration;

        // Define wiring & notch
        this.wiring = [...ROTOR_CONFIGURATIONS[this.configuration.name].wiring];
        this.notch  = ROTOR_CONFIGURATIONS[this.configuration.name].notch;

        // Set state variables
        this.state.name = rotor_configuration.name

        // Assign Details
        this.details = {
            name: this.state.name,
            ring: this.alphabetRing.join(" "),
            wiring: this.wiring.join(" "),
            notch: this.notch
        };
    }

    /**
     * Rotate the rotor by n positions
     * 
     * @param {number} n Number of positions to advance or turn. Default = 1
     * @param {boolean} forward Direction in which to rotate. Default is forward
     * @returns {void}
     */
    rotate(n=1, forward=true){}

    /**
     * Set Rotor Setting (Ringsellung)
     * - Creates the offset integer
     * - Moves the Alphabet Ring relative to the wiring assembly
     * - Uses dotPosition of character in wiring array
     */
    setRingSetting(){}

    /**
     * Set Starting position:
     * - This is the character that is visible in the window
     * - This moves the entire assembly (alphabet ring and wiring) together
     */
    setStartPosition(){}

    /**
     * Forward
     */
    forward(signal){
        // Find character from signal int
        const letter = this.wiring[signal];

        // Encode using plugboard swapped keys
        return this.alphabetRing.indexOf(letter);
    }

    /**
     * Backward
     */
    backward(signal){
        // Find character from signal int
        const letter = this.alphabetRing[signal];

        // Encode using plugboard swapped keys
        return this.wiring.indexOf(letter);
    }
}