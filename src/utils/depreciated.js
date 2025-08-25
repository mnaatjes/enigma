/**
 * Components
 */
const components = {
    rotors: [
        new Rotor({name: "III"}),
        new Rotor({name: "II"}),
        new Rotor({name: "I"}),
    ],
    keyboard: new Keyboard(),
    reflector: new Reflector({name: DEFAULT_REFLECTOR_SETTING}),
    plugboard: new Plugboard(DEFAULT_PLUGBOARD_SETTINGS)
};
/*----------------------------------------------------------*/
/**
 * @function encrypt
 * 
 * @param {string} message
 * @param {object} components
 * 
 * @returns {string}
 */
/*----------------------------------------------------------*/
export function encrypt(message, components){
    /**
     * Validate
     */
    /**
     * Destructure components
     */
    const { rotors, keyboard, reflector, plugboard } = components;
    const results = [];
    /**
     * Props
     */
    const rotors_fwd = [...rotors];
    const rotors_bwd = [...rotors];
    rotors_bwd.reverse();
    const names_fwd = rotors_fwd.map(obj => obj.name).join(" -> ");
    const names_bwd = rotors_bwd.map(obj => obj.name).join(" -> ");
    /**
     * Debugging
     */
    console.error(`KB -> PB -> ${names_fwd} -> REF -> ${names_bwd} -> PB -> KB`);
    /**
     * Simplified
     */
    /**
     * Perform Encryption
     */
    message.forEach(letter => {
        /**
         * Forward
         */
        const char      = validate_char(letter) ? letter : "A";
        const kb_fwd    = keyboard.forward(char);
        const pb_fwd    = plugboard.forward(kb_fwd);
        const rot_fwd   = [];
        let next_fwd    = undefined;
        /**
         * Loop rotors
         */
        rotors_fwd.forEach(rotor => {
            if(rotor.name === "III"){
                rotor.show();
                rotor.setPosition("Z");
                rotor.show();
            }
            const out = rotor.forward(next_fwd === undefined ? pb_fwd : next_fwd);
            next_fwd = out;
            rot_fwd.push(out);
        });
        const out_rot_fwd = rot_fwd[rot_fwd.length - 1];
        const reflected = reflector.reflect(out_rot_fwd);
        /**
         * Backwards
         */
        const rot_bwd   = [];
        let next_bwd    = undefined;
        rotors_bwd.forEach(rotor => {
            const out = rotor.backward(next_bwd === undefined ? reflected : next_bwd);
            next_bwd = out;
            rot_bwd.push(out);
        });
        const out_rot_bwd = rot_bwd[rot_bwd.length - 1];
        const pb_bwd    = plugboard.backward(out_rot_bwd);
        const kb_bwd    = keyboard.backward(pb_bwd);

        results.push(kb_bwd);
        /**
         * Debugging
         */
        console.warn(
            "Signal:", get_fixed_char(kb_fwd), kb_fwd, "\n",
            "   Plug:", get_fixed_char(pb_fwd), pb_fwd, "\n",
            " Rotors:", rot_fwd.map((signal) => {
                return `${get_fixed_char(signal)} ${signal}`;
            }), "\n",
            "Reflect:", get_fixed_char(reflected), reflected, "\n",
            " Rotors:", rot_bwd.map((signal) => {
                return `${get_fixed_char(signal)} ${signal}`;
            }), "\n",
            "   Plug:", get_fixed_char(pb_bwd), pb_bwd, "\n",
            " Output:", kb_bwd, get_fixed_index(kb_bwd)
        );
        console.log('');
    });
    /**
     * Return Output
     */
    const result = [];
    for(let i = 0; i < results.length; i += 5){
        result.push(results.slice(i, i + 5).join(""));
    }
    console.log(result.join(" "));

}
encrypt(Array(5).fill("A"), components);