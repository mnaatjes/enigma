/**
 * @memberof Enigma
 */

import { ALPHABET } from "../constants.js";

export class Rotor {
    /**
     * Regular Alphabet LEFT
     * @type {array}
     */
    fixed = ALPHABET;
    /**
     * Cypher RIGHT
     * @type {array}
     */
    wiring = [];
    /*----------------------------------------------------------*/
    /**
     * 
     * @param {array} wiring 
     * @param {string} notch 
     */
    /*----------------------------------------------------------*/
    constructor(wiring, notch){
        this.wiring = this.#initWiring(wiring);
        this.notch  = this.#initNotch(notch);
    }
    /*----------------------------------------------------------*/
    /**
     * Initialize Wiring
     */
    /*----------------------------------------------------------*/
    #initWiring(arr){
        return arr;
    }
    /*----------------------------------------------------------*/
    /**
     * Initialize Notch
     */
    /*----------------------------------------------------------*/
    #initNotch(char){
        return char;
    }
    /*----------------------------------------------------------*/
    /**
     * Forward
     */
    /*----------------------------------------------------------*/
    /*----------------------------------------------------------*/
    /**
     * Backward
     */
    /*----------------------------------------------------------*/
}