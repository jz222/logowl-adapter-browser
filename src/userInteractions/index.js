import utils from '../utils/index';

/**
 * Stores the latest 25 user interactions.
 * @returns {{add: add, get: (function(): [])}}
 */
const userInteractions = () => {
    const userInteractions = [];
    
    /**
     * Adds a new user interaction to the store.
     * @param e {object} the event object
     */
    const add = (e) => {
        const userInteraction = {
            timestamp: utils.generateUTCInSeconds(),
            element: e.target.tagName.toLowerCase(),
            outerHtml: e.target.outerHTML.replace(/"/g, `'`),
            elementId: e.target.id,
            location: window.location.pathname,
            path: e.path.map(node => {
                if (node === window) {
                    return 'window';
                }
                
                if (node === document) {
                    return 'document';
                }
                
                return (node.tagName || '').toLowerCase();
            })
        };
        
        userInteractions.push(userInteraction);
        
        if (userInteractions.length > 25) {
            userInteractions.shift();
        }
    };
    
    /**
     * Returns all stored user interactions.
     * @returns {[]} stored user interactions
     */
    const get = () => userInteractions;
    
    return { add, get };
};

export default userInteractions();