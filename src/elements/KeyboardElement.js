import { create_element } from "../test/utils/create_element.js";

/**
 * @memberof Enigma
 * 
 * @class KeyboardElement
 * @extends HTMLElement
 * 
 * @version 1.0
 * @since 1.0 Created:
 */
export class KeyboardElement extends HTMLElement {

    /**
     * QWERTY Keyboard layout
     * @static
     * @type {array}
     */
    static QWERTY = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");
    
    /**
     * Observed Attribute names
     * @static
     * @type {array}
     */
    static get observedAttributes(){
        return []
    }

    /**
     * Web Component has been initialized
     * @private
     * @type {boolean}
     */
    _isInitialized = false;

    /**
     * @constructor
     */
    constructor(){
        // Invoke Super
        super();
        // Attach shadow
        this.attachShadow({mode: 'open'});
        // Render element
        this.render();
    }
    /**
     * Render
     */
    render(){
        /**
         * Determine if initialized
         */
        if(this._isInitialized === false){
            /**
             * Initialize web component
             */
            /**
             * Define dataset
             */
            const data = KeyboardElement.QWERTY.reduce((acc, _, i, arr) => {
                if(i == 10){
                    acc.push(arr.slice(0, i));
                } else if (i === 19){
                    acc.push(arr.slice(10, i))
                } else if(i === 25){
                    acc.push(arr.slice(19));
                }
                return acc;
            }, []);
            /**
             * Define template and content
             */
            const _template = document.createElement('template');
            const _styles = create_element('link', {attributes: {
                href: "./src/test/styles.css",
                rel: "stylesheet"
            }});
            const _content = create_element('div', {
                classList: ["keyboard--container"]
            }, 
                // rows
                data.map((arr) => {
                    return create_element('div', {
                        classList: ["keyboard--row"]
                    }, 
                        // keys
                        arr.map((key) => {
                            return create_element('button', {
                                textContent: key,
                                classList: ["--input", "keyboard--key"]
                            })
                        })
                    )
                })
            );
            /**
             * Clone and mount template to shadowRoot
             */
            _template.innerHTML = _styles.outerHTML + _content.outerHTML;
            this.shadowRoot.appendChild(_template.content.cloneNode(true));
        } else {
            /**
             * Re-render web component
             */
        }
    }
}