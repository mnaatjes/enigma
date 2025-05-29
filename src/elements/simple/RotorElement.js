import { create_element } from "../../utils/create_element";

/**
 * @class RotorElement
 */
export class RotorElement {
    /**
     * Test
     */
    constructor(){
        this.name           = {};
        this.position       = {};
        this.ring_setting   = {};
    }
    /**
     * Build Name
     */
    buildName(){
        const element = create_element('div', {
            classList: ["settings__grid--item"]
        }, []);

        /**
         * Return Object
         */
        return {
            element,
        }
    }
}