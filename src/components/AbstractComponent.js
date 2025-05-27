

/**
 * @class AbstractComponent
 * @memberof Enigma
 * @version 1.0
 * @since 1.0 Created
 * 
 * @abstract
 */
export class AbstractComponent {
    /**
     * Fixed Alphabet 
     * @static 
     * @type {array}
     */
    static ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    /**
     * Determines if component has been initialized
     * @type {boolean}
     */
    isInitialized = false;
    /**
     * Settings of Enigma Component
     * @type {Object}
     */
    settings;
    /**
     * Wiring array for Component
     * @type {array}
     */
    wiring = AbstractComponent.ALPHABET;
    /**
     * Alphabet array for Component
     * @type {array}
     */
    fixed = AbstractComponent.ALPHABET;
    /**
     * HTML Element representing the Enigma component
     * @type {HTMLElement}
     */
    element;
    /**
     * Log
     * @type {Object}
     */
    log = {
        config: {},
        input: undefined,
        output: undefined
    };
    /*----------------------------------------------------------*/
    /**
     * @abstract
     * 
     * @throws {TypeError}
     */
    /*----------------------------------------------------------*/
    constructor(config){
        /**
         * Prevent direct instantiation of this abstract class
         */
        if(new.target === AbstractComponent){
            throw new TypeError('Cannot instantiate this abstract class "Abstract Component" directly!');
        }
        /**
         * Update settings and configuration
         */
        this.update(config);
    }
    /*----------------------------------------------------------*/
    /**
     * Define HTML Element
     */
    /*----------------------------------------------------------*/
    #defineElement(config){
        customElements.define(config.tag_name, config.construct);
    }
    /*----------------------------------------------------------*/
    /**
     * Parses Config and returns settings
     * 
     * @param {Object} config Component Configuration object properties and values
     */
    /*----------------------------------------------------------*/
    #parseConfig(config){
        /**
         * Determine class instance
         */
        switch(this.constructor.name){
            /**
             * Keyboard Component
             */
            case 'Keyboard':
                /**
                 * Return settings object for Keyboard
                 */
                return {
                    name: config.name,
                    wiring: AbstractComponent.ALPHABET,
                    fixed: AbstractComponent.ALPHABET,
                };
            /**
             * Default
             */
            default: 
                break;
        }
    }
    /*----------------------------------------------------------*/
    /**
     * Updates the entire component:
     * - Update settings
     * - Re-render component HTML
     * 
     * @param {object} config
     * 
     * @returns {void}
     * @throws {Error}  Errors:
     *  - Cannot parse settings
     */
    /*----------------------------------------------------------*/
    update(config){
        /**
         * Determine if initialized or update
         */
        if(this.isInitialized === false){
            /**
             * Initialize Object:
             * - Parse Settings and define
             * - Create custom element
             */
            this.settings = this.#parseConfig(config_component);
            /**
             * Validate Settings
             */
            if(this.settings !== undefined){
                /**
                 * Render Element
                 */
                this.element = this.render(config_element);
                /**
                 * Mount element
                 */
                this.mount(config_element);
                /**
                 * Set isInitialized
                 */
                this.isInitialized = true;
            } else {
                throw new Error(`Unable to parse settings for ${this.constructor.name}!`);
            }
        } else {
            /**
             * Update settings:
             * - Check if settings exist
             */
            /**
             * Log configuration
             */
            /**
             * Render html element
             */
        }
    }
    /*----------------------------------------------------------*/
    /**
     * Forward encryption of signal
     * 
     * @param {int} signal
     * 
     * @returns {int} Signal from forward encryption
     */
    /*----------------------------------------------------------*/
    forward(signal){}
    /*----------------------------------------------------------*/
    /**
     * Backward encryption of signal
     * 
     * @param {int} signal
     * 
     * @returns {int} Signal from forward encryption
     */
    /*----------------------------------------------------------*/
    backward(signal){}
    /*----------------------------------------------------------*/
    /**
     * Renders the component HTML Element:
     * - Creates component
     * - Defined tag
     * - Returns created HTML Element
     * 
     * @param {HTMLElement} config
     * 
     * @returns {HTMLElement}
     * @throws {}
     */
    /*----------------------------------------------------------*/
    render(config){
        /**
         * Determine if initialized
         */
        if(this.isInitialized === false){
            /**
             * Create Element
             */
            const element = document.createElement(config.tag_name);
            /**
             * Return Element
             */
            return element;

        } else {
            /**
             * Re-render
             */
        }
    }
    /*----------------------------------------------------------*/
    /**
     * Mounts rendered element to DOM
     * 
     * @param {HTMLElement} config Parent HTML Element
     * 
     * @returns {void} Appends Class element property to parent parameter
     * @throws {TypeError, Error}
     */
    /*----------------------------------------------------------*/
    mount(config){
        /**
         * Validate element property:
         * - Rendered?
         * - Already mounted?
         */
        if(!(this.element instanceof HTMLElement)){
            throw TypeError('Element property has not been rendered!');
        }
        // Already Mounted
        if(this.element.isConnected){
            throw new Error('Element is already mounted!');
        }
        /**
         * Validate parent element
         */
        if(config.parent instanceof HTMLElement && config.parent.isConnected){
            /**
             * Parent Valid:
             * - Append
             */
            config.parent.appendChild(this.element);
            /**
             * Attach listeners
             */

        } else {
            // Parent Invalid
            throw new TypeError('Parent element parameter in "mount()" is NOT an HTML Element!');
        }
    }
    /*----------------------------------------------------------*/
    /**
     * Log encryption data and configuration data
     * 
     * @private
     * 
     * @param {void}
     * @returns {void}
     */
    /*----------------------------------------------------------*/
    #logData(){}
    /*----------------------------------------------------------*/
    /**
     * Get Signal Index from Fixed Alphabet
     * @private
     * 
     * @param {string} char Single character string 
     * 
     * @returns {int} Signal integer 0-25
     * @throws {Error, RangeError}
     */
    /*----------------------------------------------------------*/
    #getFixedSignal(char){
        /**
         * Validate
         */
        if(!AbstractComponent.#validateChar(char)){
            throw new Error(`Character supplied "${char}" is invalid!`);
        }
        /**
         * Validate Index and return
         */
        const index = AbstractComponent.ALPHABET.indexOf(char.toUpperCase());
        if(AbstractComponent.#validateSignal(index)){
            return index;
        } else {
            throw new RangeError(`Could not resolve character "${char}" to index "${index}"`);
        }
    }
    /*----------------------------------------------------------*/
    /**
     * Returns single character from fixed alphabet based on signal (index)
     * @private
     * 
     * @param {int} signal 
     * @returns {string}
     * @throws {Error}
     */
    /*----------------------------------------------------------*/
    #getFixedChar(signal){
        /**
         * Validate
         */
        if(!AbstractComponent.#validateSignal(signal)){
            throw new Error(`Signal "${signal}" is invalid!`);
        }
        /**
         * Cast as int if string
         */
        if(typeof signal === 'string'){
            signal = parseInt(signal);
        }
        /**
         * Convert
         */
        const char = AbstractComponent.ALPHABET[signal];
        /**
         * Validate and return
         */
        if(AbstractComponent.#validateChar(char)){
            return char;
        } else {
            throw new Error(`Could not resolve signal "${signal}" to character "${char}"!`);
        }
    }
    /*----------------------------------------------------------*/
    /**
     * Validate Signal (index)
     * @static
     * @private
     * 
     * @param {int} signal 
     * @returns {boolean}
     */
    /*----------------------------------------------------------*/
    static #validateSignal(signal){
        /**
         * Check if numeric
         */
        if(isNaN(signal)){
            return false;
        }
        /**
         * Check is int
         */
        if(!Number.isInteger(signal)){
            /**
             * Try casting as integer
             */
            try {
                const parsed = parseInt(signal);
                if(isNaN(parsed)){
                    // Not a number
                    return false;
                } else if(parsed >= 0 && parsed < AbstractComponent.ALPHABET.length) {
                    // Valid
                    return true;
                }
                // Return Default
                return false;
            } catch (error){
                /**
                 * Return default
                 */
                return false;
            }
        }
        /**
         * Is int: Check range
         */
        if(signal >= 0 && signal < AbstractComponent.ALPHABET.length){
            return true;
        } else {
            /**
             * Return Default
             */
            return false;
        }
    }
    /*----------------------------------------------------------*/
    /**
     * Validate Character
     * @static
     * @private
     * 
     * @param {string} char 
     * @returns {boolean}
     */
    /*----------------------------------------------------------*/
    static #validateChar(char){
        /**
         * Check Type
         */
        if(typeof char !== 'string'){
            return false;
        }
        /**
         * Check length
         */
        if(char.length > 1){
            return false;
        }
        /**
         * Check character:
         * - Non-numeric
         * - Pregmatch
         */
        if(!isNaN(char)){
            return false;
        }
        if(!/^[a-zA-Z]$/.test(char)){
            return false;
        }
        /**
         * Evaluate
         */
        return AbstractComponent.ALPHABET.includes(char.toUpperCase());
    }
    /*----------------------------------------------------------*/

}