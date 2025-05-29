import { create_element } from "../../utils/create_element.js";
/**
 * @function draw_simple_rotor
 */
export function draw_simple_rotor(index){
    /**
     * Build grid row
     */
    const row = create_element('article', {
        attributes: {id: `rotor__0${index}`},
        classList: ["settings__grid"]
    });
    /**
     * Rotor Name Selecting Element
     * @type {HTMLElement}
     */
    const rotor_name = create_element('div', {classList: ["settings__grid--item"]}, [
        create_element('h4', {textContent: "Rotor"}),
        create_element('select', {
            attributes: {id: `rotor__0${index}__name`}
        }, ["I", "II", "III", "VIII"].map((num, i) => {
            return create_element('option', {
                attributes: {value: i},
                textContent: num
            })
        }))
    ]);
    /**
     * Rotor Position Field Element
     * @type {HTMLElement}
     */
    const rotor_position = create_element('div', {classList: ["settings__grid--item"]}, [
        create_element('h4', {textContent: "Position"}),
        create_element('div', {classList: ["field--container"], attributes: {id: `rotor__0${index}__pos`}}, [
            create_element('button', {innerHTML: "&minus;"}),
            create_element('span', {textContent: "B"}),
            create_element('button', {innerHTML: "&plus;"})
        ])
    ]);
    /**
     * Rotor Ring Field Element
     * @type {HTMLElement}
     */
    const rotor_ring = create_element('div', {classList: ["settings__grid--item"]}, [
        create_element('h4', {textContent: "Ring"}),
        create_element('div', {classList: ["field--container"], attributes: {id: `rotor__0${index}__ring`}}, [
            create_element('button', {innerHTML: "&minus;"}),
            create_element('span', {textContent: "Z"}),
            create_element('button', {innerHTML: "&plus;"})
        ])
    ]);
    /**
     * Append Elements
     */
    row.appendChild(rotor_name);
    row.appendChild(rotor_position);
    row.appendChild(rotor_ring);
    /**
     * Return Array
     */
    return row;
}