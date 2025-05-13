import { STATOR, DEBUG, ETW, ROTORS } from "./constants.js";

/**
 * Rotor Class
 */
export class TestRotor {
    /**
     * Character representing the initial position of the visible ring
     * - This is the Initial Position
     * - Visible part of Dial
     * @type {string}
     * @example "Z"
     */
    start;
    /**
     * Ring Setting
     * @type {string}
     * @example "A"
     */
    setting;
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
    constructor(wiring, notch, name, order, start, ring){
        /**
         * General Properties
         */
        this.name       = name;
        this.order      = order;
        this.notch      = notch;
        /**
         * Static Arrays
         */
        this.etw        = ETW;
        this.default    = wiring;
        /**
         * Dynamic Arrays
         */
        this.stator     = STATOR;
        this.wiring     = wiring;
        /**
         * Rotor Specific Settings:
         * - Checks starting character
         * - Initializes Rotor start position (Stator and Wiring)
         */
        this.start      = this.#validateStart(start);
        /**
         * 
         */
        this.ring       = ring;
        /**
         * Ring Setting (Offset): Fixed (static) rotational position of the alphabet ring relative to the wiring
         * - Fixed rotational position of alphabet ring
         * - Relative to internal wiring
         * - Affects turnover notch:
         *      - Notch attached to the alphabet ring
         *      - Changes WHEN a rotor will cause the next rotor to step
         * - This is the offset
         * - Adjusts the internal wiring (gears) relative to the letters that appear
         */
        this.offset     = this.#initOffset();
        /**
         * Initial Position:
         * - Grundstellung: [Rotor] Start Position
         * - Refers to the Letter visible in the visible window
         * - TODO: Should base on ETW or Stator?
         * @uses start parameter to derive index from ETW?? (static) alphabet
         */
        this.position   = 0;
        /**
         * HTML | Rendering Properties
         */
        this.node       = this.#createNode();
        /**
         * INIT ROTORS
         */
        this.initRotors();
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
     * Initialize Rotors
     */
    /*----------------------------------------------------------*/
    initRotors(){
        if(this.order === 0){
            /**
             * Shift Stator and Wiring:
             * - Get lead letter this.stator[0] from stator
             * - Stator index == 0
             * - Rotate stator array until start index is lead letter
             */
            const start_index = this.etw.indexOf(this.start);
            this.debugPosition();
            /**
             * Rotate Rotor (wiring and stator) to initial position
             */
            for(let i = 0; i < start_index; i++){
                this.rotate();
            }
            /**
             * Rotate ETW based on Ring Setting
             */
            const ring_index = this.etw.indexOf(this.ring);
            for(let i = 0; i < ring_index; i++){
                this.rotateETW();
            }
            this.debugPosition();
        }
    }
    /*----------------------------------------------------------*/
    /**
     * Rotate ETW
     */
    /*----------------------------------------------------------*/
    rotateETW(){
        const copy      = [...this.etw];
        const removed   = copy.shift();
        copy.push(removed);
        this.etw     = copy;
    }
    /*----------------------------------------------------------*/
    /**
     * Debug Position
     */
    /*----------------------------------------------------------*/
    debugPosition(){
        console.log(
            " HEAD :", this.stator[0], 0,
            '\n',
            "RING :", this.ring, this.etw.indexOf(this.ring),
            '\n',
            "START:", this.start, this.etw.indexOf(this.start),
            '\n',
            "POS  :", this.getCurrent(), this.position,
            '\n',
            "OFF  :", this.getOffset()
        );
        this.debugRotors();
        console.log('---------------------------------------------');
    }
    /*----------------------------------------------------------*/
    /**
     * Validates Incoming start character
     * @private
     * @param {string} character
     * 
     * @return {string} character upper case
     * @throws {TypeError} Not string | Is Numeric | Is not alphabetical
     * @throws {RangeError} Larger than 1 character in length
     */
    /*----------------------------------------------------------*/
    #validateStart(character){
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
     * Initializes starting position:
     * - Initialized from this.starts
     * - Dynamic and will advance with each rotation
     * 
     * @private
     * @uses this.start
     * @example start = "Z" -> position = 25
     * 
     * @returns {int}
     * @throws {ReferenceError} Start not set
     */
    /*----------------------------------------------------------*/
    #initPosition(){
        /**
         * Check that start is set
         */
        if(this.start !== undefined && this.start !== null && this.etw.includes(this.start)){
            return 0;
        } else {
            throw new ReferenceError('Start position has not been set!');
        }
    }
    /*----------------------------------------------------------*/
    /**
     * initializes offset value:
     * - Value never changes from initial
     * - Static
     * 
     * @private
     * @uses this.start
     * @example start = "Z" -> position = 25
     * 
     * @returns {int} Static value derived from initial starting character and position
     * @throws {ReferenceError} Start not set
     */
    /*----------------------------------------------------------*/
    #initOffset(){
        /**
         * Check that start is set
         */
        if(this.start !== undefined && this.start !== null && this.etw.includes(this.start)){
            /**
             * Return index of offset
             */
            return this.etw.indexOf(this.start);
        } else {
            throw new ReferenceError('Start position has not been set!');
        }
    }
    /*----------------------------------------------------------*/
    /**
     * Debugging Method: Show Stator and Wiring
     * 
     * @remarks Displays this.stator and this.wiring fo rotor in console
     */
    /*----------------------------------------------------------*/
    debugRotors(){
        console.log(
            " STATOR", this.stator.join("-"),'\n',
            "WIRING", this.wiring.join("-"), '\n',
            "ETW   ", this.etw.join("-")
        );
    }
    /*----------------------------------------------------------*/
    /**
     * Gets the current character (in the view window):
     * - Based on the Stator Array
     * @returns {string}
     * @example "A"
     */
    /*----------------------------------------------------------*/
    getCurrent(){return ETW[this.position];}
    /*----------------------------------------------------------*/
    /**
     * Gets the current position (which changes by rotation) of the rotor
     * @returns {int}
     */
    /*----------------------------------------------------------*/
    //getPosition(){return this.stator.indexOf(this.getCurrent());}
    /*----------------------------------------------------------*/
    /**
     * Gets the offset integer value set at the beginning of the rotor initiation
     * @returns {int}
     */
    /*----------------------------------------------------------*/
    getOffset(){return this.offset;}
    /*----------------------------------------------------------*/
    /**
     * Steps position
     * - Advances position by 1
     * - Sets this.position
     * - For use in this.rotate()
     * @private
     * @uses this.etw
     * 
     * @returns {void} Sets this.position
     */
    /*----------------------------------------------------------*/
    #stepPosition(){this.position = (this.position + 1) % this.etw.length;}
    /*----------------------------------------------------------*/
    /**
     * Creates HTML Node representing Rotor Window
     * 
     * @private
     * @uses this.start
     * 
     * @returns {HTMLElement}
     */
    /*----------------------------------------------------------*/
    #createNode(){
        //const node = document.createElement('div');
        return null;
    }
    /*----------------------------------------------------------*/
    /**
     * Rotates both Stator and Wiring
     * 
     * @uses this.rotateStator()
     * @uses this.rotateWiring()
     * 
     * @returns {void}
     */
    /*----------------------------------------------------------*/
    rotate(){
        /**
         * Add to position
         */
        this.#stepPosition();
        /**
         * Rotate Stator and Wiring
         */
        this.rotateStator();
        this.rotateWiring();
    }
    /*----------------------------------------------------------*/
    /**
     * Rotates Stator array
     * @returns {void}
     * @example
     */
    /*----------------------------------------------------------*/
    rotateStator(){
        /**
         * Rotate Stator
         */
        const copy      = [...this.stator];
        const removed   = copy.shift();
        copy.push(removed);
        this.stator     = copy;
    }
    /*----------------------------------------------------------*/
    /**
     * Rotates Wiring array
     * @returns {void}
     * @example
     */
    /*----------------------------------------------------------*/
    rotateWiring(){
        const copy      = [...this.wiring];
        const removed   = copy.shift();
        copy.push(removed);
        this.wiring     = copy;
    }
    /*----------------------------------------------------------*/
    /**
     * Encrypts through the Rotor in the FORWARDS direction:
     * - Rightmost to leftmost
     * - ETW -> Stator -> Wiring -> Stator -> ETW
     * - Rotates for rotor order and (if 0) rotates BEFORE signal encryption
     * - Checks notch position re: previous rotor (if order 1, 2) and rotates BEFORE encryption
     * 
     * @uses this.order
     * @uses this.rotate()
     * @uses this.checkNotch()
     * 
     * @param {string} signal Character letter
     * 
     * @returns {string} Encoded character from rotor
     * @throws {TypeError}
     * @throws {RangeError}
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
            this.debugPosition();
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
     * Encrypts through the Rotor in the BACKWARDS direction:
     * - Leftmost to rightmost
     * - ETW -> Wiring -> Stator -> Wiring -> ETW
     * 
     * @param {string} signal Character letter
     * 
     * @returns {string} Encoded character from rotor
     * @throws {TypeError}
     * @throws {RangeError}
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
    /*----------------------------------------------------------*/
    /**
     * SHOW
     * TODO: Remove after debugging
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