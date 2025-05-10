/*----------------------------------------------------------*/
/**
 * @class Rotor
 * @memberof Enigma
 * @version 1.0
 * @since 05-09-2025
 */

import { INDEXES } from "../constants/settings.js";

/*----------------------------------------------------------*/
export class Rotor {
    /**
     * @type {string} rotor
     */
    rotor;
    /**
     * Wiring array of rotor
     * @type {array}
     */
    wiring;
    /**
     * Notch character
     * @type {string|array}
     */
    notch;
    /**
     * HTML Element node for rotor in Ringstellung
     * @type {HTMLElement}
     */
    node;
    /*----------------------------------------------------------*/
    /**
     * @constructor Rotor initialization
     * 
     * @param {array} wiring
     * @param {string} notch
     * @param {string} label Rotor name: e.g. "I" or "IV"
     * @param {int|string} init_position Initial position
     * @param {HTMLElement} parent Parent Node
     */
    /*----------------------------------------------------------*/
    constructor(wiring, notch, label, init_position, parent){
        // declare data container
        this._data = {
            position: {index: 0, char: "A"}
        };
        // Set wiring
        this.wiring = this.setWiring(wiring);
        // Set notch
        this.notch = this.setNotch(notch);
        // Set name for debugging
        this.label = label;
        // Set initial position
        this.position = init_position;
        // Generate node
        this.node = this.createNode();
        // Set parent
        this.parent = this.setParent(parent);
    }
    /*----------------------------------------------------------*/
    /**
     * Set wiring
     * @param {array} wiring
     * 
     * @returns {array} uppercase indexed array
     */
    /*----------------------------------------------------------*/
    setWiring(wiring){
        /**
         * Validate
         */
        if(Array.isArray(wiring) && wiring.length === 26){
            /**
             * Check values are strings of single characters
             */
            const is_valid = wiring.every((ele) => {
                return (typeof ele === 'string' && ele.length === 1);
            });
            if(is_valid){
                /**
                 * Set all values to upper case
                 */
                return wiring.map((ele) => {return ele.toUpperCase();});
            } else {
                throw new TypeError('Wiring array is not properly formatted');
            }
        } else {
            throw new TypeError('Wiring must be an array of length 26!');
        }
    }
    /*----------------------------------------------------------*/
    /**
     * Set notch
     * @param {string} notch
     * 
     * @return {string} Single or Double character, uppercase.
     */
    /*----------------------------------------------------------*/
    setNotch(notch){
        /**
         * Validate
         */
        if(typeof notch !== 'string'){
            throw new TypeError('Notch must be a string!');
        }
        if(notch.length > 2){
            throw new Error('Notch character(s) must be limited to 2');
        }
        /**
         * Return
         */
        return notch.toUpperCase();
    }
    /*----------------------------------------------------------*/
    /**
     * Validate parent element:
     * - Check html element
     * - Set innerHTML empty
     * - Return element
     * 
     * @param {HTMLElement} element
     * 
     * @returns {HTMLElement}
     * @throws {TypeError} Parent not HTML Element
     * @throws {Error} Parent not connected
     */
    /*----------------------------------------------------------*/
    setParent(element){
        if(element instanceof HTMLElement){
            // Check if attached
            if(element.isConnected){
                // Empty contents
                element.innerHTML = '';
                return element;
            } else {
                throw new Error('Parent element of Rotor (Ringstellung) is NOT attached to the DOM!');
            }
        } else {
            throw new TypeError('Parent must be a valid HTML Element!');
        }
    }
    /*----------------------------------------------------------*/
    /**
     * Checks notch is ready to engage
     * @uses this.position[char]
     * @uses this.notch
     * @uses this.step() if notch reached
     */
    /*----------------------------------------------------------*/
    checkNotch(){}
    /*----------------------------------------------------------*/
    /**
     * Step rotor one position
     * 
     * @param {void}
     * @return {void} Advances rotor by 1:
     * - Adds 1 to position
     * - Modulo ensures rotor wraps around from Z to A (or [25] to [0])
     */
    /*----------------------------------------------------------*/
    step(){
        // Set position
        this.position = (this.position.index + 1) % 26;
        // Re-render Rotor
        this.render();
    }
    /*----------------------------------------------------------*/
    /**
     * Set rotor position
     * 
     * @param {string} letter
     * @deprecated
     */
    /*----------------------------------------------------------*/
    setPosition(letter){
        /**
         * Validate
         */
        if(typeof letter !== 'string' && letter.length !== 1){
            throw new TypeError('Letter provided must be a string of length 1');
        }
        /**
         * Set to upper
         */
        letter = letter.toUpperCase();
        /**
         * Render letter to number
         */
        this.position = INDEXES.indexOf(letter);
    }
    /*----------------------------------------------------------*/
    /**
     * Get position:
     * - Returns an object with number(index) and the letter corresponding to the Position index of the rotor
     * - NOT the output character of the cypher / wiring
     * - This is the character visible in the window
     * - This is the index of the rotor position
     * 
     * @returns {object<index: int, char: string>}
     */
    /*----------------------------------------------------------*/
    get position(){return this._data.position;}
    /*----------------------------------------------------------*/
    /**
     * Sets the position object:
     * - Position of the rotor
     * - Parses argument as string or int
     * - Determines position
     * - Assigns num and char values
     * 
     * @param {int|string} arg
     * 
     * @return {void}
     */
    /*----------------------------------------------------------*/
    set position(arg){
        /**
         * Check type of argument:
         * - empty
         * - string
         * - int
         */
        if(arg === null || arg === undefined){
            throw new TypeError('Undefined position value!');
        } else if (typeof arg !== 'string' && typeof arg !== 'number'){
            throw new TypeError('Position value must be a string or an integer!');
        } else {
            /**
             * Validate each type of value and assign both:
             * - String
             * - Int
             */
            if(typeof arg === 'string' && arg.length === 1){
                /**
                 * Valid string of length 1
                 * - Set to upper
                 * - Assign index
                 * - Assign char
                 */
                this._data.position = {
                    index: INDEXES.indexOf(arg.toUpperCase()),
                    char: arg.toUpperCase()
                };
            } else if((typeof arg === 'number' && Number.isInteger(arg)) && (arg < 26 && arg > 0)){
                /**
                 * Valid integer within 0 and 26:
                 * - Assign index
                 * - Assign char from num index
                 */
                this._data.position = {
                    index: arg,
                    char: INDEXES[arg]
                };
            }
        }
    }
    /*----------------------------------------------------------*/
    /**
     * Creates html node representing Rotor
     * @param {void}
     * 
     * @returns {HTMLElement}
     */
    /*----------------------------------------------------------*/
    createNode(){
        // Rotor wheel
        const wheel = document.createElement('div');
        // Rotor Casing
        const casing = document.createElement('div');
        // Character Display
        const char = document.createElement('div');
        // Element properties
        char.id = 'rotor__' + this.rotor;
        char.classList.add('rotor--window');
        // Append
        return char;
    }
    /*----------------------------------------------------------*/
    /**
     * Renders rotor window with character
     * @return {HTMLElement} Returns to then append
     */
    /*----------------------------------------------------------*/
    render(){
        /**
         * Set character
         */
        this.node.textContent = this.position.char;
        /**
         * Check if node attached
         */
        if(!this.node.isConnected){
            /**
             * Attach rotor to DOM
             */
            this.parent.appendChild(this.node);
        }
    }
    /*----------------------------------------------------------*/
    /**
     * forward
     * 
     * @param {string} incoming
     */
    /*----------------------------------------------------------*/
    forward(incoming){

    }
    /*----------------------------------------------------------*/
    /**
     * Debugging
     * 
     */
    /*----------------------------------------------------------*/
    debug(){
        // Log
        console.warn('Position(' + this.rotor + '):', this.position.char, this.position.index);
    }
}