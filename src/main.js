/**
 * @namespace Enigma
 * @version 2.5
 * @since 2.5 Overview:
 * - Creating components
 * - Creating custom elements
 * 
 */

import { AbstractElement } from "./custom_elements/AbstractElement.js";

/**
 * @function render
 * @param {object} configuration
 */
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

/**
 * Testing
 */
/*
const obj = {a: 1, b: 2};
console.log(obj);
console.log("Call", Object.prototype.hasOwnProperty.call(obj, 'toString'));
*/