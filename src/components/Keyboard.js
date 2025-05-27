import { KeyboardElement } from "../elements/KeyboardElement.js";
import { create_element } from "../test/utils/create_element.js";
import { AbstractComponent } from "./AbstractComponent.js";
/**
 * @class Keyboard
 * @memberof Enigma
 * 
 * @version 2.0
 * @since 2.0   Created in src/components 
 */
export class Keyboard extends AbstractComponent {
    /**
     * Default Keyboard Configuration
     * @static
     * @type {Object}
     */
    static DEFAULT_CONFIG = {
        /**
         * Component Configuration
         */
        component: {
            name: "keyboard",
        }
    };

    constructor(){
        // Invoke AbstractComponent
        super(Keyboard.DEFAULT_CONFIG);
    }

}