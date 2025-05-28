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
    const tbody = table.createTBody();
    /**
     * Validate and Parse Data
     * - Validate object
     * - Assign as object
     */
    if(typeof data !== 'object'){
        throw new Error('Data not object');
    }
    /**
     * Get colspan
     * Cycle data
     */
    const colspan = Math.max(...Object.values(data).map((obj) => {
        return Object.keys(obj).length;
    }));
    Object.entries(data).forEach(([header, rowData]) => {
        /**
         * Create HTML Elements
         * - Rows (tr)
         * - Append Header
         */
        const row = tbody.insertRow();
        const head = row.insertCell();
        head.textContent = header;
        /**
         * Process Row Data
         * - Declare cell container
         * - Determine rowData type
         * - Determine col-span: max-len
         */
        if(typeof rowData === 'object'){
            /**
             * Object | Array
             */
            if(Array.isArray(rowData)){
                // Determine Colspan
                if(colspan === rowData.length){
                    rowData.forEach(cellData => {
                        const cell = row.insertCell();
                        cell.textContent = cellData;
                    });
                }
            } else {
                /**
                 * Objects:
                 * - Recursive
                 */
                const cell = row.insertCell();
                cell.appendChild(json_to_table(rowData));
            }
        } else {
            /**
             * Determine No | Null | Undefined
             */
            if(data !== null && data !== undefined){
                /**
                 * Data single item:
                 * - Use full colspan
                 * - Append Data
                 */
                const cell       = row.insertCell();
                cell.colSpan     = colspan;
                cell.textContent = rowData;
            }
        }
    });
    /**
     * Return table node
     */
    return table;
}