import { STATOR, DEBUG, ETW, ROTORS } from "./constants.js";

/**
 * Rotor Class
 */
export class TestRotor {
    /**
     * Character representing the initial position of the visible ring
     * @type {string}
     * @example "Z"
     */
    start;
    /**
     * Represents the lead Stator Array character indexed to ETW:
     * - Initial is based off start character
     * - Advances with each rotation
     * - Dynamic
     * @type {int} 
     * @example start = "Z" --> position = 25
     */
    position;
    /**
     * The fixed starting point of the rotor for a given session:
     * - Fixed to starting point
     * - Set once and doesn't change
     * - Static
     * @type {int}
     */
    offset;
    /*----------------------------------------------------------*/
    /**
     * @constructor
     * 
     * @param {array} wiring 
     * @param {string} notch 
     * @param {string} name 
     * @param {int} order 
     * @param {string} start 
     */
    /*----------------------------------------------------------*/
    constructor(wiring, notch, name, order, start){
        /**
         * General Properties
         */
        this.name       = name;
        this.order      = order;
        this.notch      = notch;
        /**
         * Static Arrays
         */
        this.etw        = ETW;  // Default alphabet static
        this.default    = wiring; // Default wiring static
        /**
         * Dynamic Arrays
         */
        this.stator     = STATOR;
        this.wiring     = wiring;
        /**
         * Rotor Specific Settings
         */
        this.start      = this.validateStart(start);
        this.position   = this.initPosition(this.start);
        this.offset     = this.initOffset(this.position);
        /**
         * HTML | Rendering Properties
         */
        this.node       = this.createNode();
    }
    /*----------------------------------------------------------*/
    /**
     * FORMAT
     * TODO: Remove after debugging
     */
    /*----------------------------------------------------------*/
    format(name){
        switch(name.length){
            case 1:
                return name + "  ";
            case 2:
                return name + " ";
            default:
                return name;
        }
    }
    /*----------------------------------------------------------*/
    /**
     * Validates Incoming start character
     * @param {string} character
     * @return {string} character upper case
     * @throws {TypeError} Not string | Is Numeric | Is not alphabetical
     * @throws {RangeError} Larger than 1 character in length
     */
    /*----------------------------------------------------------*/
    validateStart(character){
        /**
         * Validate:
         * - String
         * - Length
         * - Numeric
         */
        if(typeof character !== 'string'){
            throw new TypeError('Invalid "start" parameter! Parameter must be a string!');
        }
        if(character.length !== 1){
            throw new RangeError(`String: "${character}" provided is too long! Character must be 1 unit in length.`);
        }
        if(!isNaN(character)){
            throw new TypeError(`Character supplied "${$character}" must be an letter`);
        }
        if(!(/^[a-zA-Z]+$/.test(character))){
            throw new TypeError(`Character supplied "${character}" is invalid! Must be a letter from A-Z.`);
        }
        /**
         * Return valid character
         * - Uppercase
         */
        return character.toUpperCase();
    }
    /*----------------------------------------------------------*/
    /**
     * Initalizes starting position:
     * - Initialized from this.starts
     * - Dynamic and will advance with each rotation
     * @uses this.start
     * @returns {int}
     * @example start = "Z" -> position = 25
     * 
     */
    /*----------------------------------------------------------*/
    initPosition(){}
    /*----------------------------------------------------------*/
    /**
     * initializes offset value:
     * - Value never changes from initial
     * - Static
     * @uses this.start
     * @returns {int}
     * @example start = "Z" -> position = 25
     * 
     */
    /*----------------------------------------------------------*/
    initOffset(){}
    /*----------------------------------------------------------*/
    /**
     * Gets the current character (in the view window):
     * - Based on the ETW array (static) of the position index (dynamic)
     * @returns {string}
     * @example "A"
     */
    /*----------------------------------------------------------*/
    getCurrent(){return this.etw[this.position];}
    /*----------------------------------------------------------*/
    /**
     * Gets the current position (which changes by rotation) of the rotor
     * @returns {int}
     */
    /*----------------------------------------------------------*/
    getPosition(){return this.position;}
    /*----------------------------------------------------------*/
    /**
     * Gets the offset integer value set at the beginning of the rotor initiation
     * @returns {int}
     */
    /*----------------------------------------------------------*/
    getOffset(){return this.offset;}
    /**
     * INIT ROTOR POSITION
     */
    initRotor(start){
        const index_stator  = 0;
        const char_stator   = this.stator[index_stator];
        const index_start   = this.etw.indexOf(start);
        console.log("CHAR STATOR:", char_stator, "STATOR:", this.stator.join(""), "WIRING:", this.wiring.join(""));
    }
    /**
     * CREATE NODE
     */
    createNode(){
        //const node = document.createElement('div');
        return null;
    }
    /**
     * ROTATE
     */
    rotate(){
        /**
         * Add to position
         */
        this.position = (this.position + 1) % this.etw.length;
        /**
         * Rotate Stator and Wiring
         */
        this.rotateStator();
        this.rotateWiring();
    }
    rotateStator(){
        /**
         * Rotate Stator
         */
        const copy      = [...this.stator];
        const removed   = copy.shift();
        copy.push(removed);
        this.stator     = copy;
    }
    rotateWiring(){
        const copy      = [...this.wiring];
        const removed   = copy.shift();
        copy.push(removed);
        this.wiring     = copy;
    }
    /*----------------------------------------------------------*/
    /**
     * FORWARD
     */
    /*----------------------------------------------------------*/
    forward(signal){
        /**
         * Validate
         */
        if(typeof signal !== 'string'){
            throw new Error('BAD SIGNAL!');
        } else {
            signal = signal.toUpperCase();
        }
        /**
         * Check for lead (rightmost) order:
         * - Rotate
         */
        if(this.order === 0){
            this.rotate();
        }
        /**
         * Encrypt:
         * 1) Find static alphabetical index of signal
         * 2) Check static index against stator
         * 3) Get output character from wiring (offset)
         * 4) Find index of output character from stator in stator
         * 5) Resolve output using static alphabet
         */
        const input_index   = this.etw.indexOf(signal);
        const input_char    = this.stator[input_index];
        const output_char   = this.wiring[input_index];
        const output_index  = this.stator.indexOf(output_char);
        const output        = this.etw[output_index];
        /**
         * Check stepped
         */
        const stepped = this.etw[0] !== this.stator[0];
        if(stepped && DEBUG){
            const offset = Math.abs(input_index - this.etw.indexOf(input_char));
            console.warn('INPUT INDEX:', input_index, "INPUT CHAR:", input_char, "OFFSET:", offset);
        }
        /**
         * SHOW
         */
        this.show(signal, output, stepped);
        /**
         * Return output
         */
        return output;
    }
    /*----------------------------------------------------------*/
    /**
     * BACKWARD
     */
    /*----------------------------------------------------------*/
    backward(signal){
        /**
         * Validate
         */
        if(typeof signal !== 'string'){
            throw new Error('BAD SIGNAL!');
        } else {
            signal = signal.toUpperCase();
        }
        /**
         * Encrypt:
         * 1) Find static alphabetical index of signal
         * 2) Check static index against wiring
         * 3) Get output character from stator (offset)
         * 4) Find index of output character from stator in wiring
         * 5) Resolve output using static alphabet
         */
        const input_index   = this.etw.indexOf(signal);
        const input_char    = this.wiring[input_index];
        const output_char   = this.stator[input_index];
        const output_index  = this.wiring.indexOf(output_char);
        const output        = this.etw[output_index];
        /**
         * Check stepped
         */
        const stepped = this.etw[0] !== this.stator[0];
        if(stepped && DEBUG){
            const offset = Math.abs(input_index - this.etw.indexOf(input_char));
            console.warn('INPUT INDEX:', input_index, "INPUT CHAR:", input_char, "OFFSET:", offset);
        }
        /**
         * SHOW
         */
        this.show(signal, output, stepped);
        /**
         * Return output
         */
        return output;
    }
    /**
     * SHOW
     */
    show(signal, output, stepped){
        if(DEBUG){
            console.log(
                'ROTOR:', this.format(this.name), 
                "SIGNAL:", signal, this.etw.indexOf(signal),
                "OUTPUT", output, this.etw.indexOf(output),
                "STEP:", stepped
            );
        }
    }
}