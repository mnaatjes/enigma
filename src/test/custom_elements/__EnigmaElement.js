/**
 * @class EnigmaNode
 * @uses defineCustom
 * @uses HTMLElement
 */
export class __EnigmaElement {
    /**
     * Qwerty Keyboard
     * @type {array}
     */
    static QWERTY = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");
    /*----------------------------------------------------------*/
    /**
     * 
     * @param {HTMLElement} parent 
     * @param {Object} components Object of enigma components
     */
    /*----------------------------------------------------------*/
    constructor(parent, components){
        /**
         * Set components as Class Properties
         */
        Object.entries(components).forEach(([prop, obj]) => {
            //this[prop] = obj;
        });
        /**
         * Define Parent
         * Reset parent contents
         */
        this.parent = parent;
        this.parent.innerHTML = "";
        /**
         * Gather Component HTML Elements
         */
        this.elements = Object.entries(components).map(([prop, obj]) => {
            console.log(prop);
            console.log(obj);
        });
    }
    /*----------------------------------------------------------*/
    /**
     * Render
     */
    /*----------------------------------------------------------*/
    render(){
        /**
         * @function createTemplate
         * 
         * @param {Object<HTMLElement>} elements
         */

        /**
         * Define
         * Create new HTML Object
         */
        const test = "This is a test component";
        customElements.define('enigma-machine', class extends HTMLElement {
            constructor(){
                super();
                /**
                 * Attach shadow
                 */
                this.attachShadow({mode: 'open'});
                /**
                 * Create Template
                 */
                const template      = document.createElement('template');
                template.innerHTML  = `<h1>${test}</h1>`;
                this.shadowRoot.appendChild(template.content.cloneNode(true));
            }
        })
        /**
         * Append to parent
         */
        this.parent.appendChild(document.createElement('enigma-machine'));
        /**
         * Rotors
         */
        /**
         * Lampboard
         */
        /**
         * Keyboard
         */
    }
}