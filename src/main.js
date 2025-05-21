/**
 * @namespace Enigma
 * @version 2.5
 * @since 2.5 Overview:
 * - Creating components
 * - Creating custom elements
 * 
 */

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
        constructor(){
            super(config);
        }
    });
    /**
     * Mount
     */
    config.parent.appendChild(document.createElement(config.tag_name));
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
    /**
     * Validate parent
     */
    /**
     * Validate Content
     */
    /**
     * Check properties Exist:
     */
    /**
     * Generate Content function and append properties
     */
    /**
     * Return results object
     */

}

const config = buildConfig('invalidName', document.getElementById('invalid'), 12, {});


/**
 * @type {object}
 */
const element_config = {
    tag_name: 'test-element',
    parent: document.getElementById('test_parent'),
    props: {
        title: "Gemini",
        type: "Puppy",
    },
    content: function(instance){return `<b>${instance.title}</b>`;}
};
render(element_config);