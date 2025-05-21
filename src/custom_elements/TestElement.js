import { AbstractElement } from "./AbstractElement.js";

/**
 * @class TestElement
 * 
 * @memberof Enigma
 * @version 1.0
 * @since 1.0   Created
 */
export class TestElement extends AbstractElement {
    /**
     * 
     */
    constructor(template, tag_name){
        /**
         * Invoke AbstractElement Constructor
         */
        super({
            template,
            props: []
        });
    }
}