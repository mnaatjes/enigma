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
    offset = 0;

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
        this.state.offset = (forward === true) ?
            n % ALPHABET.length :
            (n % ALPHABET.length) * -1;
        
        // Assign new notch character
        this.notch.char = Rotor.FIXED[this.notch.index - this.state.offset];

        // Debugging
        console.log(Rotor.FIXED.join(" "));
        console.log(this.alphabetRing.join(" "));
        console.log(this.wiring.join(" "));
        console.log(this.state);
        console.log(this.notch);
        
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
        // TODO: Validate Character
        character = character.toUpperCase();

        // Convert character to offset integer
        this.offset = Rotor.FIXED.indexOf(character);

        let output = [...this.alphabetRing];

        // Index of character at wiring
        let dotIndex        = this.wiring.indexOf("A") + this.offset;
        let shiftedWiring   = [...this.wiring];

        // Shift Wiring array characters by offset
        for(let i=0; i < this.offset; i++){
            shiftedWiring = shiftedWiring.map((letter) => {
                let index = Rotor.FIXED.indexOf(letter) + 1;
                return Rotor.FIXED[index];
            });
        }
        
        // Rotate Wiring Array
        for(let i=0; i < this.offset; i++){
            const poppedChar = shiftedWiring.pop();
            shiftedWiring.unshift(poppedChar);
        }

        // Debugging
        console.log("Offset:    ", this.offset);
        console.log("Dot Index: ", dotIndex);
        console.log("Input:     ", this.alphabetRing.join(" "));
        console.log("Init Wire: ", this.wiring.join(" "));
        //console.log("Output:    ", output.join(" "));
        console.log("Shift Wire:", shiftedWiring.join(" "));
        console.log("POS of " + character + ":  ", shiftedWiring.indexOf(character));
    }

    /**
     * Set Starting position:
     * - This is the character that is visible in the window
     * - This moves the entire assembly (alphabet ring and wiring) together
     */
    setStartPosition(character="A"){}
}