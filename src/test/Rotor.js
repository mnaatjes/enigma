import { STATOR, DEBUG, ETW, ROTORS } from "./constants.js";

/**
 * Rotor Class
 */
export class TestRotor {
    constructor(wiring, notch, name, order){
        this.name       = name;
        this.wiring     = wiring;
        this.default    = wiring;
        this.order      = order;
        this.stator     = STATOR;
        this.etw        = ETW;
        this.notch      = notch;
        this.node       = this.createNode();
    }
    /**
     * FORMAT
     */
    format(name){
        switch(name.length){
            case 1:
                return name + "  ";
            case 2:
                return name + " ";
            default:
                return name;
        }
    }
    /**
     * CREATE NODE
     */
    createNode(){
        //const node = document.createElement('div');
        return null;
    }
    /**
     * ROTATE
     */
    rotate(){
        /**
         * Rotate Stator and Wiring
         */
        this.rotateStator();
        this.rotateWiring();
    }
    rotateStator(){
        /**
         * Rotate Stator
         */
        const copy      = [...this.stator];
        const removed   = copy.shift();
        copy.push(removed);
        this.stator     = copy;
    }
    rotateWiring(){
        const copy      = [...this.wiring];
        const removed   = copy.shift();
        copy.push(removed);
        this.wiring     = copy;
    }
    /*----------------------------------------------------------*/
    /**
     * FORWARD
     */
    /*----------------------------------------------------------*/
    forward(signal){
        /**
         * Validate
         */
        if(typeof signal !== 'string'){
            throw new Error('BAD SIGNAL!');
        } else {
            signal = signal.toUpperCase();
        }
        /**
         * Encrypt
         */
        const input_index   = this.etw.indexOf(signal);
        const input_char    = this.stator[input_index];
        const output_char   = this.wiring[input_index];
        const output_index  = this.stator.indexOf(output_char);
        const output        = this.etw[output_index];
        /**
         * Check stepped
         */
        const stepped = this.etw[0] !== this.stator[0];
        if(stepped){
            const offset = Math.abs(input_index - this.etw.indexOf(input_char));
            console.warn('INPUT INDEX:', input_index, "INPUT CHAR:", input_char, "OFFSET:", offset);
        }
        /**
         * SHOW
         */
        this.show(signal, output, stepped);
        /**
         * Return output
         */
        return output;
    }
    /*----------------------------------------------------------*/
    /**
     * BACKWARD
     */
    /*----------------------------------------------------------*/
    backward(signal){
        /**
         * Validate
         */
        if(typeof signal !== 'string'){
            throw new Error('BAD SIGNAL!');
        } else {
            signal = signal.toUpperCase();
        }
        /**
         * Encrypt
         */
        const input_index   = this.etw.indexOf(signal);
        const input_char    = this.wiring[input_index];
        const output_char   = this.stator[input_index];
        const output_index  = this.wiring.indexOf(output_char);
        const output        = this.etw[output_index];
        /**
         * Check stepped
         */
        const stepped = this.etw[0] !== this.stator[0];
        if(stepped){
            const offset = Math.abs(input_index - this.etw.indexOf(input_char));
            console.warn('INPUT INDEX:', input_index, "INPUT CHAR:", input_char, "OFFSET:", offset);
        }
        /**
         * SHOW
         */
        this.show(signal, output, stepped);
        /**
         * Return output
         */
        return output;
    }
    /**
     * SHOW
     */
    show(signal, output, stepped){
        console.log(
            'ROTOR:', this.format(this.name), 
            "SIGNAL:", signal, this.etw.indexOf(signal),
            "OUTPUT", output, this.etw.indexOf(output),
            "STEP:", stepped
        );
    }
}