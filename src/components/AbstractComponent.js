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
     * Settings of Enigma Component
     * @type {Object}
     */
    settings;
    /**
     * Wiring array for Component
     * @type {array}
     */
    wiring;
    /**
     * Alphabet array for Component
     * @type {array}
     */
    fixed;
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
    constructor(config, template){
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
            this.element = render(template);
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
     * @param {object|null} config Default from object
     */
    /*----------------------------------------------------------*/
    update(config=null){
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
     * @param {HTMLElement} template
     * 
     * @returns {HTMLElement}
     * @throws {}
     */
    /*----------------------------------------------------------*/
    render(template){}
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
     * Log encryption data and configuration data
     * 
     * @private
     * 
     * @param {void}
     * @returns {void}
     */
    /*----------------------------------------------------------*/
    #logData(){}

}