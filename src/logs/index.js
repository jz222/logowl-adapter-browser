import utils from '../utils/index';

/**
 * Stores the latest 15 console logs.
 * @returns {{add: add, get: (function(): [])}}
 */
const logs = () => {
    const logs = [];
    
    /**
     * Adds a new log to the store.
     * @param log {string} the log that should be stored
     */
    const add = (log) => {
        if (typeof log !== 'string') {
            return;
        }
        
        logs.push({ timestamp: utils.generateUTCInSeconds(), type: 'log', log });
        
        if (logs.length > 15) {
            logs.shift();
        }
    };
    
    /**
     * Returns all stored logs.
     * @returns {[]}
     */
    const get = () => logs;
    
    return { add, get };
};

export default logs();