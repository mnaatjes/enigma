/**
 * JSON Enigma State Schema
 */
const enigma_state_schema = {
    input: {char: "A", signal: 0},
    output: {char: "Y", signal: 24},
    config: {
        rotors: [{
            name: "I",
            position: "A",
            ring_setting: "Z",
            notch: "E",
            atNotch: false,
            fixed: "ABCD...",
            wiring: "EJK..."
        }],
        reflector: {},
        plugboard: {}
    },
    path: {
        forwards: {
            plugboard: {input: {}, output: {}},
            rotors: [
                {input: {}, output: {}}
            ]
        },
        reflector: {},
        backwards: {
            rotors: [
                {input: {}, output: {}}
            ],
            plugboard: {input: {}, output: {}},
        }
    },
    stepped: [
        true, false, false
    ],
    count: 0
};