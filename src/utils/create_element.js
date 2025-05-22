/**
 * @function createElement
 * @param {string} tag_name
 * @param {object} properties
 * @param {array} children
 * 
 * @version 1.1
 * @since 1.0   Created
 * @since 1.1   Changed appending of attributes to try{ele[prop] = val} catch{ele.setAttribute}
 * 
 * @returns {HTMLElement}
 */
export function create_element(tag_name, properties={}, children=[]){
    /**
     * Try creating new element from tag_name
     */
    const element = create_element_from_tagName(tag_name === undefined ? "div" : tag_name);
    if(element === null){
        throw new RangeError(`Unable to create new HTML Element using tag name: "${tag_name}"`);
    }
    /**
     * @type {object} default_properties
     */
    const default_properties = {
        style: {},
        classList: [],
        attributes: {},
        textContent: "",
        innerHTML: ""
    };
    /**
     * Validate:
     * - Names
     * - Types
     */
    const has_valid_props = Object.entries(properties).every(([key, values]) => {
        /**
         * Check key
         */
        if(properties.hasOwnProperty(key)){
            /**
             * Check type of value
             */
            return typeof values === typeof properties[key];
        }
        /**
         * Return default
         */
        return false;
    });
    /**
     * Merge objects
     */
    const props = has_valid_props ? properties : {};
    /**
     * Apply properties
     */
    Object.entries(props).forEach(([key, values]) => {
        /**
         * Append Styles
         */
        if(key === 'style' && Object.values(values).length > 0){
            Object.entries(values).forEach(([prop, val]) => {
                element.style[prop] = val;
            });
        }
        /**
         * Append Attributes
         */
        if(key === 'attributes' && Object.values(values).length > 0){
            Object.entries(values).forEach(([prop, value]) => {
                try {
                    // Try appending directly
                    element[prop] = value;
                    // Validate
                    if(element.getAttribute(prop) !== value){
                        // Throw to setAttribute
                        throw new Error();
                    }
                } catch (error){
                    element.setAttribute(prop, value);
                }
            });
        }
        /**
         * Add classList
         */
        if(key === 'classList' && values.length > 0){
            values.forEach(className => {
                element.classList.add(className);
            });
        }
        /**
         * Append TextContent and InnerHTML
         */
        if(key === "textContent"){
            element.textContent = values;
        } else if(key === "innerHTML"){
            element.innerHTML = values;
        }
    });
    /**
     * Append Children
     */
    if(children.length > 0 && children.every(obj => obj instanceof HTMLElement)){
        children.forEach(child => {
            element.appendChild(child);
        });
    }
    /**
     * Return element
     */
    return element;
}

/**
 * @function create_element_from_tagName
 * 
 * @param {string} tag_name
 * 
 * @returns {HTMLElement}
 */
function create_element_from_tagName(tag_name){
    try {
        const element = document.createElement(tag_name);
        return element;
    } catch (err){
        return null;
    }
}