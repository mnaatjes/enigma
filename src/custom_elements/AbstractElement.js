/**
 * @class AbstractElement
 * 
 * @memberof Enigma
 * 
 * @version 1.0
 * @since 1.0 Created
 */
export class AbstractElement extends HTMLElement {
    /**
     * Data object containing values of props for getters and setters
     * @private
     * @type {object}
     */
    _data;
    
    /**
     * Inner HTML of template
     * @private
     * @type {function}
     */
    _content;

    /**
     * @private
     * @property {boolean} _isConnected - Flag to track if the component is connected to the DOM.
     */
    _isConnected = false;

    /**
     * @private
     * @property {Map<string, any>} _privateState - A map to store internal, reactive state.
     * Changes to this state can trigger re-renders.
     */
    _privateState = new Map();

    /**
     * @static
     * @method observedAttributes
     * @returns {string[]} An array of attribute names to observe for changes.
     *
     * Subclasses should override this getter to declare which attributes
     * they want to react to via `attributeChangedCallback`.
     * @example
     * static get observedAttributes() {
     * return ['my-attribute', 'another-attribute'];
     * }
     */
    static get observedAttributes() {
        return [];
    }
    /*----------------------------------------------------------*/
    /**
     * @constructor
     */
    /*----------------------------------------------------------*/
    constructor(config){
        // Super for HTML Element
        super();
        /**
         * Attach shadow root open
         */
        this.attachShadow({mode: 'open'});
        /**
         * Declare empty propsData container
         */
        this._data = {};
        /**
         * Assign _content property to html component instance
         * Validate content property of config
         */
        if(typeof config.content !== 'function'){
            throw new TypeError('Parameter "config" must have property "content" that is a Function!');
        }
        this._content = config.content;
        /**
         * Parse "props" and add to class 
         * - Create a data placeholder props "this._prop_name"
         * - Add getter() of "this.prop_name"
         * - Add setter() of "this.prop_name"
         */
        Object.entries(config.props).forEach(([prop_name, prop_value]) => {
            /**
             * Validate:
             * - Ensure config.props has property
             * - Ensure property is not a part of instance, e.g. "this.title" doesn't already exist
             */
            if(config.props.hasOwnProperty(prop_name) && !Object.prototype.hasOwnProperty.call(this, prop_name)){
                /**
                 * Insert properties and values into _data object
                 */
                this._data[prop_name] = prop_value;
                /**
                 * Define getters and setters of this instance
                 */
                Object.defineProperty(this, prop_name, {
                    /**
                     * Getter for each property of config.props
                     * @returns {mixed} value from this._data object
                     */
                    get: function(){return this._data[prop_name];},
                    /**
                     * Setter for each property of config.props:
                     * - Saves value in this._data
                     * - Calls this.render() to re-render html component element
                     * @returns {void}
                     */
                    set: function(value){
                        // Set value in data
                        this._data[prop_name] = value;
                        // Re-render html component
                        this.render();
                    }
                });
            }
        });
        /**
         * Render Template and populate content
         */
        this.render();

    }
    /*----------------------------------------------------------*/
    /**
     * Render
     */
    /*----------------------------------------------------------*/
    render(){
        /**
         * Create Template:
         * - Create Template Element
         * - Populate innerHTML
         */
       const _template      = document.createElement('template');
       _template.innerHTML  = this._content(this);
       /**
        * Append template to shadowRoot:
        * - Clone template
        * - Append
        */
        this.shadowRoot.appendChild(_template.content.cloneNode(true));
    }
    /*----------------------------------------------------------*/
}