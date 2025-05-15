/*----------------------------------------------------------*/
/**
 * Ringstellung or Rotor Settings or Rotors
 * - Area at the top of the machine which configures the initial rotor positions
 * - Displays the character representing the index of the Rotor; e.g. 0 = "A"
 */

import { Rotor } from "./Rotor.js";

/*----------------------------------------------------------*/
export class Ringstellung {
    /**
     * Rotor Wiring Diagrams with notches
     * @readonly
     * @type {object<string: object<array, string>>}
     */
    static ROTORS = {
        "I": {
            wiring: "EKMFLGDQVZNTOWYHXUSPAIBRCJ".split(""),
            notch: "Q"
        },
        "II": {
            wiring: "AJDKSIRUXBLHWTMCQGZNPYFVOE".split(""),
            notch: "E"
        },
        "III": {
            wiring: "BDFHJLCPRTXVZNYEIWGAKMUSQO".split(""),
            notch: "V"
        },
        "IV": {
            wiring: "ESOVPZJAYQUIRHXLNFTGKDCMWB".split(""),
            notch: "J"
        },
        "V": {
            wiring: "VZBRGITYUPSDNHLXAWMJQOFECK".split(""),
            notch: "Z"
        },
        "VI": {
            wiring: "JPGVOUMFYQBENHZRDKASXLICTW".split(""),
            notch: "ZM"
        },
        "VII": {
            wiring: "NZJHGRCXMYSWBOUFAIVLPEKQDT".split(""),
            notch: "ZM"
        },
        "VII": {
            wiring: "FKQHTLXOCBJSPDZRAMEWNIUYGV".split(""),
            notch: "ZM"
        },
    };
    /**
     * Parent container element
     * @type {HTMLElement}
     */
    parent;
    /**
     * HTML Element representing the Ringstellung container
     * @type {HTMLElement}
     */
    node;
    /**
     * Settings (in order) of the Ringstellung
     * @type {object}
     */
    settings;
    /**
     * Array of Rotor objects
     * @type {array}
     */
    rotors=[];
    /**
     * Debugging setting
     * @type {boolean}
     */
    debug = false;
    /*----------------------------------------------------------*/
    /**
     * Constructor
     * 
     * @param {HTMLElement} parent Parent element to house all rotors
     */
    /*----------------------------------------------------------*/
    constructor(parent, settings={
        "III": "A",
        "II": "A",
        "I": "Z",
    }){
        /**
         * Validate and init parent
         */
        this.parent = this.setParent(parent);
        /**
         * Validate Settings
         */
        this.settings = this.validateSettings(settings);
        /**
         * Initialize Node
         */
        this.node = this.createNode();
        this.parent.appendChild(this.node);
        /**
         * Initialize Rotors
         */
        this.rotors = this.setRotors(this.settings);
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
                throw new Error('Parent element of Ringstellung is NOT attached to the DOM!');
            }
        } else {
            throw new TypeError('Parent must be a valid HTML Element!');
        }
    }
    /*----------------------------------------------------------*/
    /**
     * Create node
     */
    /*----------------------------------------------------------*/
    createNode(){
        // Generate node
        const ele = document.createElement('div');
        // Assign properties
        ele.classList.add('rotor--casing');
        ele.id = "ringstellung";
        // Return node
        return ele;
    }
    /*----------------------------------------------------------*/
    /**
     * Validate rotor settings
     * 
     * @param {object} obj
     * 
     * @returns {object} Rotor settings in order
     * @throws {TypeError} Settings must be an object
     * @throws {Error} Invalid configuration: keys or values
     */
    /*----------------------------------------------------------*/
    validateSettings(obj){
        /**
         * Check is valid obj
         */
        if(typeof obj !== 'object'){
            throw new TypeError('Settings must be an object!');
        }
        /**
         * Check object size
         */
        if(Object.keys(obj).length !== 3){
            throw new Error('Settings must have 3 different rotors configured!');
        }
        /**
         * Validate settings:
         * - Check keys: duplicates and length
         * - Check values: length
         * - Check both against schema
         */
        if(!Object.keys(obj).map(key => key in obj).every(val => val === true)){
            throw new Error('Invalid Rotors in settings! Check settings keys!');
        }
        if(!Object.values(obj).map(char => (typeof char === 'string' && char.length === 1)).every(val => val === true)){
            throw new Error('Invalid Rotor positions in settings! Check rotor values!');
        }
        /**
         * Set all characters to upper case
         */
        obj = Object.entries(obj).reduce((acc, [key, val]) => {
            acc[key] = val.toUpperCase();
            return acc;
        }, {});
        /**
         * Valid keys and values:
         * - Return settings
         */
        return obj;
    }
    /*----------------------------------------------------------*/
    /**
     * Initialize Rotors
     * 
     * @param {obj} settings
     * @returns {array[Rotor]} Array of Rotor Objects
     */
    /*----------------------------------------------------------*/
    setRotors(settings){
        /**
         * Declare container
         */
        const results = [];
        /**
         * Cycle rotors:
         * - Get wiring
         * - Create new Rotor instance
         * - Push to results
         */
        Object.entries(settings).forEach(([rotor, position]) => {
            // Get wiring
            const wiring = Ringstellung.ROTORS[rotor].wiring;
            // Get notch
            const notch = Ringstellung.ROTORS[rotor].notch;
            // Push new Rotor object
            results.push(new Rotor(wiring, notch, rotor, position, this.node));
        });
        /**
         * Validate results:
         * - Throw error
         * - Return array
         */
        if(Object.keys(results).length !== 3){
            // Results array of invalid size
            throw new Error('Problem creating Rotors array! Please check Ringstellung settings');
        } else if(Object.values(results).every(item => !(item instanceof Rotor))){
            // Not all values instances of Rotor object
            throw new Error('Problem creating Rotors array! Please check Ringstellung settings');
        } else {
            return results;
        }
    }
    /*----------------------------------------------------------*/
    /**
     * Renders Ringstellung onto parent
     * 
     * @param {void}
     * @returns {void}
     */
    /*----------------------------------------------------------*/
    render(){
        /**
         * Check rotors initialized
         */
        if(Array.isArray(this.rotors) && this.rotors.length === 3 && this.rotors.every(ele => ele instanceof Rotor)){
            /**
             * Loop rotors and append nodes
             */
            this.rotors.forEach(rotor => {
                rotor.render();
            });
        } else {
            throw new Error('Major rendering error! Check rotor settings and rotors array!');
        }
    }
    /*----------------------------------------------------------*/
    /**
     * Forward
     */
    /*----------------------------------------------------------*/
    forward(signal){
        /**
         * Reverse order of array:
         * - Make copy
         * - Reverse copy
         * - Signal strikes rotor.order === 2 [index = 0] first!
         */
        const rotors = [...this.rotors].reverse();
        const result = rotors.reduce((acc, rotor, index) => {
            // Properties
            const input = (index === 0) ? signal : acc;
            /**
             * Determine step:
             * - By order
             * - By notch
             */
            if(index === 0){
                rotor.step();
            }
            // Perform Forward
            const output = rotor.forward(input);
            /**
             * Debug
             */
            if(this.debug){
                console.warn('Rotor:', rotor.label, 'Position:', rotor.position.index, 'Input:', input, 'Output:', output);
                //console.warn('Rotor:', rotor.label, 'Input:', input, 'Output:', output);
            }
            acc = output;
            return acc;
        }, '');
        /**
         * Return output from first 3 rotors
         */
        return result;
    }
    /*----------------------------------------------------------*/
    /**
     * Backward
     */
    /*----------------------------------------------------------*/
    backward(signal){
        /**
         * Reverse order of array:
         * - Make copy
         * - Reverse copy
         * - Signal strikes rotor.order === 2 [index = 0] first!
         */
        const rotors = this.rotors;
        const result = rotors.reduce((acc, rotor, index) => {
            // Properties
            const input = (index === 0) ? signal : acc;
            // Perform Backward Calculation
            const output = rotor.backward(input);
            /**
             * Debug
             */
            if(this.debug){
                //console.warn('Rotor:', rotor.label, 'Input:', input, 'Output:', output);
                console.warn('Rotor:', rotor.label, 'Position:', rotor.position.index, 'Input:', input, 'Output:', output);
            }
            acc = output;
            return acc;
        }, '');
        /**
         * Return output from first 3 rotors
         */
        return result;
    }
    /*----------------------------------------------------------*/
}