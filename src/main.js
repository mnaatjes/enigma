/**
 * @namespace Enigma
 * @version 2.5
 * @since 2.5 Overview:
 * - Creating components
 * - Creating custom elements
 * 
 */
import { ALPHABET } from "./constants.js";
import { create_element } from "./utils/create_element.js";
import { AbstractElement } from "./custom_elements/AbstractElement.js";

/*----------------------------------------------------------*/
/**
 * Defines and Creates Custom HTML Component from AbstractElement and appends to DOM
 * @function render
 * 
 * @param {{
 *      tag_name: string,
 *      parent: HTMLElement,
 *      props: object
 *      content: function
 * }} configuration
 * 
 * @returns {void} Renders and Mounts custom web component to DOM
 */
/*----------------------------------------------------------*/
function render(configuration){
    /**
     * Declare "config" as constant
     */
    const config = configuration;
    /**
     * Define new Construct
     */
    customElements.define(config.tag_name, class extends AbstractElement {
        /**
         * Set Observed Attributes from private _data object keys
         * @type {Array}
         * @uses config.props
         */
        /*
        static get observedAttributes(){
            return Object.keys(config.props);
        }
        */
        /**
         * @constructor
         */
        constructor(){
            super(config);
        }
    });
    /**
     * Create Custom Element
     */
    const element = document.createElement(config.tag_name);
    /**
     * Mount Custom Element
     */
    config.parent.appendChild(element);
    /**
     * Return Custom Element
     */
    return element;
}

/*----------------------------------------------------------*/
/**
 * @function buildConfig
 * Custom Element Configuration Factory:
 * - Validate tag_name prop
 * - Validate parent prop
 * - Build and append props object
 * - Generate content method
 * 
 * @param {string} tag_name
 * @param {HTMLElement} parent
 * @param {string} content
 * @param {object} properties
 * 
 * @returns {{
 *      tag_name: string,
 *      parent: HTMLElement,
 *      props: object
 *      content: function
 * }}
 */
/*----------------------------------------------------------*/
function buildConfig(tag_name, parent, content, properties={}){
    /**
     * Validate tag_name
     */
    if(!tag_name.includes("-")){
        throw new RangeError(`Parameter "tag_name" MUST include a hyphen (-)! "${tag_name}" provided`);
    }
    /**
     * Validate parent:
     * - Instance
     * - Connected
     */
    if(!(parent instanceof HTMLElement)){
        throw new TypeError(`Parameter "parent" MUST be an HTML Element! Type: "${typeof parent}" provided!`);
    }
    if(parent.isConnected === false){
        throw new DOMException(`Parameter "parent" HTML Element "${parent.outerHTML}" is NOT connected to the DOM!`);
    }
    /**
     * Validate Content:
     * - Type
     */
    if(typeof content !== 'function'){
        throw new TypeError(`Parameter "content" MUST be a Function! Type: "${typeof content}" provided!`);
    }
    /**
     * Return results object
     */
    return {
        tag_name,
        parent,
        props: properties,
        content: content
    }
}

/**
 * @type {HTMLElement}
 */
const parent = document.getElementById('test_parent');

/**
 * @type {string}
 */
const content = function(instance){
    /**
     * Create Element
     */
    const button = create_element('button', {
        textContent: instance.text,
        style: {
            backgroundColor: "cornflowerblue",
            outline: "none",
            padding: "0.5rem 1rem",
            fontSize: "2rem",
            color: "#333",
            border: "1px solid #333",
            borderRadius: "4px",
            cursor: "pointer"
        },
        attributes: {
            id: "test_id",
            value: instance.value
        }
    });
    /**
     * Return outer HTML text
     */
    return button.outerHTML;
};

/**
 * @type {object}
 */
const config = buildConfig('test-element', parent, content, {
    text: "Click here!",
    value: "2"
});
const button = render(config);
button.text = "New Test";