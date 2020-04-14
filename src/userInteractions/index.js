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
        let outerHtml = e.target.outerHTML.replace(/"/g, `'`);
        
        if (e.target.tagName.toLowerCase() === 'html' || e.target.tagName.toLowerCase() === 'body') {
            outerHtml = 'n/a';
        }
        
        const userInteraction = {
            outerHtml,
            timestamp: utils.generateUTCInSeconds(),
            element: e.target.tagName.toLowerCase(),
            elementId: e.target.id,
            location: window.location.pathname
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