import { ALPHABET } from "../test/constants.js";

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
     * Default Config for Component
     * @type {Object}
     */
    DEFAULT_CONFIG = {};
    /**
     * Name of Enigma Component
     * @type {string}
     */
    name;
    /**
     * Number of encryptions during a configuration period
     */
    count = 0;
    /**
     * Settings of Enigma Component
     * @type {Object}
     */
    settings;
    /**
     * Wiring array for Component
     * @type {array}
     */
    wiring = ALPHABET;
    /**
     * Alphabet array for Component
     * @type {array}
     */
    fixed = ALPHABET;
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
        fwd: {input: undefined, output: undefined},
        bwd: {input: undefined, output: undefined}
    };
    /*----------------------------------------------------------*/
    /**
     * @abstract
     * 
     * @throws {TypeError}
     */
    /*----------------------------------------------------------*/
    constructor(config, element_props){
        /**
         * Prevent direct instantiation of this abstract class
         */
        if(new.target === AbstractComponent){
            throw new TypeError('Cannot instantiate this abstract class "Abstract Component" directly!');
        }
        /**
         * Initialize Object:
         * - Parse Settings and define
         * - Create custom element
         */
        this.settings = this.#parseConfig(config);
        /**
         * Check settings
         */
        if(this.settings != undefined){
            this.element = render(element_props);
        }
    }
    /*----------------------------------------------------------*/
    /**
     * Parses Config and returns settings
     * 
     * @param {Object} config Configuration object properties and values
     */
    /*----------------------------------------------------------*/
    #parseConfig(config){}
    /*----------------------------------------------------------*/
    /**
     * Updates the entire component:
     * - Update settings
     * - Re-render component HTML
     * 
     * @param {object|null} config Default from class
     * @param {Object|null} element_props Default from class
     */
    /*----------------------------------------------------------*/
    update(config=null, element_props=null){
        /**
         * Update settings:
         * - Validate config
         * - Check if settings exist
         */
        if(config === null){
            /**
             * Check if settings already defined:
             * - Throw error if not
             * - Skip and keep existing settings if defined
             */
            if(this.settings === undefined){
                /**
                 * Use Default Config
                 */
                this.settings = this.#parseConfig(this.DEFAULT_CONFIG);
            }
            /**
             * Log existing configurations
             */
            this.#logConfig();
        } else {
            /**
             * Check if an object:
             * - Throw error if not
             * - Parse and define settings if object
             */
            if(typeof config !== 'object'){
                throw new TypeError('Configuration parameter MUST be an Object!');
            } else {
                /**
                 * Parse Config and define settings
                 */
                this.settings = this.#parseConfig(config);
                /**
                 * Define other properties
                 */
                this.name   = this.settings.name;
                this.wiring = this.settings.wiring;
                /**
                 * Log new configuration
                 */
                this.#logConfig();
            }
        }
        /**
         * Render html element and define element:
         * - Determine if element is defined --> define and render
         */
        this.element = this.render(element_props);
        /**
         * Check if connected or mount
         */
        if(!this.element.isConnected){
            this.mount(element_props.parent);
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
     * @param {Object|null} element_props
     * 
     * @returns {HTMLElement}
     * @throws {}
     */
    /*----------------------------------------------------------*/
    render(element_props=null){
        /**
         * Determine if element is already defined
         */
        if(this.element instanceof HTMLElement){
            return this.element;
        } else {
            /**
             * Validate element props
             * TODO:
             */
            /**
             * Define Element
             */
            customElements.define(element_props.tagName, element_props.constructor);
            /**
             * Return element
             */
            return document.createElement(element_props.tagName);
        }
    }
    /*----------------------------------------------------------*/
    /**
     * Mounts rendered element to DOM
     * 
     * @param {HTMLElement} parent Parent HTML Element
     * 
     * @returns {void} Appends Class element property to parent parameter
     * @throws {TypeError, Error}
     */
    /*----------------------------------------------------------*/
    mount(parent){
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
        if(parent instanceof HTMLElement && parent.isConnected){
            // Parent Valid
            parent.appendChild(this.element);
        } else {
            // Parent Invalid
            throw new TypeError('Parent element parameter in "mount()" is NOT an HTML Element!');
        }
    }
    /*----------------------------------------------------------*/
    /**
     * Reset Count
     * 
     * @param {void}
     * @returns {void} Sets this.count to 0
     */
    /*----------------------------------------------------------*/
    #resetCount(){this.count = 0;}
    /*----------------------------------------------------------*/
    /**
     * Increment Count
     * 
     * @param {void}
     * @returns {void} Adds 1 to count
     */
    /*----------------------------------------------------------*/
    #incrementCount(){this.count++;}
    /*----------------------------------------------------------*/
    /**
     * Log configuration data
     * 
     * @param {void}
     * @uses this.log.config
     * @returns {void} Sets value of this.log.config
     */
    /*----------------------------------------------------------*/
    #logConfig(){
        this.log.config = {
            name: this.name,
            count: this.count,
            wiring: this.wiring,
            fixed: this.fixed
        };
    }
    /*----------------------------------------------------------*/
    /**
     * Log encryption data and configuration data
     * 
     * @private
     * 
     * @uses this.log.fwd
     * @uses this.log.bwd
     * @param {int} signal
     * @param {boolean} forwards Default true
     * @returns {void}
     */
    /*----------------------------------------------------------*/
    #logData(signal, forwards=true){}

}