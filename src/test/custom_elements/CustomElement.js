/**
 * @class CustomElement
 * 
 * @extends HTMLElement
 * @abstract
 */
export class CustomElement extends HTMLElement {
    /*----------------------------------------------------------*/
    /**
     * 
     */
    /*----------------------------------------------------------*/
    constructor(parent, data){
        super();
        /**
         * Declare data object
         */
        this.data = data;
        /**
         * Assign parent
         */
        this.parent = parent;
    }
    /*----------------------------------------------------------*/
    /**
     * Render
     */
    /*----------------------------------------------------------*/
    #render(template){}
}