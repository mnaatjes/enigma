/**
 * Imports
 */
import { INDEXES, KEYBOARD_TYPE } from "../constants/settings.js";
/*----------------------------------------------------------*/
/**
 * @memberof Enigma
 * @version 1.0
 * @since 05-09-2025
 * 
 * @description Keyboard for enigma
 * - Types: Input and Output
 */
/*----------------------------------------------------------*/
export class Keyboard {
    /**
     * Keyboard Type:
     * - 0: Input
     * - 1: Output
     * @type {int} type 
     */
    /*----------------------------------------------------------*/
    /**
     * @constructor
     * 
     * @param {int} type
     * @param {HTMLElement} parent 
     */
    /*----------------------------------------------------------*/
    constructor(parent, type=0){
        this.type   = type;
        this.parent = this.setParent(parent);
        this.list   = [];
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
     * @throws {TypeError}
     */
    /*----------------------------------------------------------*/
    setParent(element){
        if(element instanceof HTMLElement){
            element.innerHTML = '';
            return element;
        } else {
            throw new TypeError('Parent must be a valid HTML Element!');
        }
    }
    /*----------------------------------------------------------*/
    /**
     * Render keyboard
     * 
     * @return keyboard
     */
    /*----------------------------------------------------------*/
    render(){
        /**
         * Check parent
         */
        if(this.parent.innerHTML.length !== 0){
            this.parent.innerHTML = "";
        }
        /**
         * @const {array} keys
         */
        const layout    = "QWERTZUIOASDFGHJKPYXCVBNML".split("");
        const rows      = [
            layout.slice(0, 9),
            layout.slice(9, 17),
            layout.slice(17)
        ];
        /**
         * Keyboard Container of all keys
         * @const {HTMLElement} container
         */
        const container = document.createElement('div');
        container.classList.add('keyboard--container');
        /**
         * Loop characters
         */
        rows.forEach(row => {
            const row_ele = document.createElement('div');
            row_ele.classList.add('keyboard--row');
            // Loop keys
            row.forEach(char => {
                // Create key
                const key = document.createElement(
                    this.type === 0 ? 'button' : 'div'
                );
                key.textContent = char;
                key.classList.add('keyboard--key');
                // Add class type
                key.classList.add(
                    this.type === 0 ? '--input' : '--output'
                );
                // Get key index
                const index = INDEXES.indexOf(char);
                // Set id
                const id = this.type === 0 ? 'input__' + index : 'output__' + index;
                key.id   = id;
                // Set data attributes
                key.setAttribute('data-char', char);
                key.setAttribute('data-pos', index);
                key.setAttribute('data-enabled', false);
                // Build list
                this.list.push({
                    id,
                    pos: index,
                    enabled: false
                });
                // Push key to row
                row_ele.appendChild(key);
            });
            // Push row to container
            container.appendChild(row_ele);
        });
        /**
         * Return container
         */
        this.parent.appendChild(container);
    }
}