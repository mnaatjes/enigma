/**
 * @function json_to_table
 * 
 * @param {object} data
 * @param {HTMLElement} parent
 */
export function json_to_table(data, parent=null){
    /**
     * Create table node and define properties
     */
    const table = document.createElement('table');
    /**
     * Validate and Parse Data
     * - Validate object
     * - Assign as object
     */
    if(typeof data !== 'object'){
        throw new Error('Data not object');
    }
    const rowData = Array.isArray(data) ? data : [data];
    Object.entries(rowData).forEach((data) => {
        /**
         * Create Row
         */
    });
    /**
     * Return table node
     */
    return table;
}

/**
 * Adds row to existing table
 * 
 * @param {object}
 */

/**
 * Converts JSON structure to HTML table data structure
 * @function json_to_tabular
 * 
 * @param {object} data
 * @returns {object}
 */
function json_to_tabular(data){
    /**
     * Validate
     */
    if(typeof data !== 'object'){
        throw new TypeError('Data supplied must be in Object format!');
    }
    /**
     * Declare Containers
     */
    const results = Object.entries(data).reduce((acc, [header, values], index, arr) => {
        /**
         * Declare container:
         * - Return an object with header, value if non-object
         * - Parse data if object
         */
        if(typeof values !== 'object'){
            // Simple key-value pair
            acc.push({
                header,
                value: values
            });
        } else {
            /**
             * Determine Object | Array
             */
            if(Array.isArray(values)){
                /**
                 * Check every element is not an object
                 */
                if(values.every(ele => typeof ele !== 'object')){
                    /**
                     * Push to acc
                     */
                    acc.push({
                        header,
                        value: values
                    });
                }
            } else {
                /**
                 * Values is Object:
                 * - Recursive
                 */
                acc.push({
                    header,
                    value: json_to_tabular(values)
                });
            }
        }
        /**
         * Return acc
         */
        return acc;
    }, []);
    /**
     * Return reduced data
     */
    return results;
}