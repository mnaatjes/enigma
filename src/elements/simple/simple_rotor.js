import { create_element } from "../../utils/create_element.js";
/**
 * @function draw_simple_rotor
 */
export function draw_simple_rotor(){
    /**
     * Build Elements
     */
    
    /**
     * Build Rotor Elements
     */
    const rotor_name    = create_element('div', {
        classList: []
    }, []);
    const rotor_pos     = create_element('div', {
        classList: []
    }, []);
    const rotor_ring    = create_element('div', {
        classList: []
    }, []);
    /**
     * Return Array
     */
    return [rotor_name, ];
}