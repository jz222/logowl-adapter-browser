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
        if (!e.target) {
            return;
        }
        
        let elementId = e.target.getAttribute('data-logowl-element-id') || e.target.id;
        let innerText = e.target.innerText;
        let location = window.location.pathname;
        
        if (elementId && elementId.length >= 195) {
            elementId = elementId.slice(0, 195) + '...';
        }
        
        if (innerText && innerText.length >= 195) {
            innerText = innerText.slice(0, 195) + '...';
        }
        
        if (location && location.length >= 195) {
            location = location.slice(0, 395) + '...';
        }
        
        const userInteraction = {
            innerText: innerText || '',
            timestamp: utils.generateUTCInSeconds(),
            element: (e.target.tagName && e.target.tagName.toLowerCase()) || 'n/a',
            elementId: elementId || '',
            location: location || ''
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
