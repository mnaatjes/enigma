/**
 * @class DebugElement
 * 
 * @extends HTMLElement
 */
export class DebugElement extends CustomElement {
    constructor(parent, data){
        super(parent, data);
    }
    /*----------------------------------------------------------*/
    /**
     * Render
     */
    /*----------------------------------------------------------*/
    #returnTemplate(){
        /**
         * Reference to this.state.path
         * @type {object}
         */
        const path = this.state.path;
        /**
         * Configuration Data Object
         * @type {object}
         */
        const config_data = {
            rotors: this.state.config.rotors.map(obj => obj.name).join(", "),
            positions: this.state.config.rotors.map(obj => obj.position).join(", "),
            ring_setting: this.state.config.rotors.map(obj => obj.ring_setting).join(", "),
        }
        /**
         * Path Data object
         */
        const path_headers = [
            'IN',
            'PB',
            ...this.state.config.rotors.map(obj => obj.name),
            this.state.config.reflector.name,
            ...[...this.state.config.rotors].reverse().map(obj => obj.name),
            'PB',
            'OUT'
        ];
        const path_data = [
            this.state.input.char,
            path.forwards.plugboard.output.char,
            ...path.forwards.rotors.map(obj => obj.output.char),
            path.reflector.output.char,
            ...path.backwards.rotors.map(obj => obj.output.char),
            path.backwards.plugboard.output.char,
            this.state.output.char
        ];
        const headers = ['Rotors', 'Positions', 'Ring Settings', 'Path'];
        /**
         * Create Styling elements
         */
        const container = create_element('table', {classList: ["--ticker"]}, [
            /**
             * Headers
             */
            create_element('thead', {}, [create_element('tr', {}, 
                headers.map(title => create_element('th', {textContent: title}))
            )]),
            /**
             * Data Cells
             */
            create_element('tbody', {}, [create_element('tr', {}, [
                    ...Object.values(config_data).map(title => create_element('td', {textContent: title})),
                    create_element('td', {classList: ["--path"]}, [
                        /**
                         * Path Table
                         */
                        create_element('table', {}, [
                            create_element('tr', {}, 
                                path_headers.map(title => create_element('th', {textContent: title.toUpperCase()}))
                            ),
                            create_element('tr', {}, 
                                path_data.map(data => create_element('td', {textContent: data}))
                            ),
                        ])
                    ])
                ]
            )])
        ]);
        /**
         * Return main table node
         */
        return container;
    }
}