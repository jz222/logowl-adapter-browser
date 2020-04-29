import userInteractions from '../userInteractions/index';
import constants from '../constants/index';
import broker from '../broker/index';
import utils from '../utils/index';

/**
 * Enables the error event listener.
 */
const enableErrorListener = () => {
    let previousMsg = '';
    
    window.onerror = (message, file, line, column, error = {}) => {
        if (message === previousMsg) {
            return false;
        }
        
        previousMsg = message;
        setTimeout(() => previousMsg = '', 2000);
        
        column = column || (window.event && window.event.errorCharacter);
        
        const errorEvent = {
            message,
            path: file,
            line,
            column,
            stack: error.stack,
            constructor: error.constructor
        };
        
        broker.registerError(errorEvent);
        
        return false;
    };
    
    window.onunhandledrejection = (error) => {
        const dummyError = new Error();
        
        dummyError.stack = error.reason.stack;
        
        const stacktrace = utils.parseStacktrace(dummyError);
        
        const errorEvent = {
            message: error.reason.message,
            path: stacktrace.path,
            line: stacktrace.line,
            stack: error.reason.stack,
            constructor: {
                name: error.type
            }
        };
        
        broker.registerError(errorEvent);
    };
};

/**
 * Enables the event listener for user interactions.
 */
const enableUserInteractionsListener = () => {
    const focusableElements = constants.focusableElements;
    
    const focusInListener = (e) => {
        const tagName = e.target.tagName.toLowerCase();
        
        if (utils.includes(focusableElements, tagName)) {
            userInteractions.add(e);
        }
    };
    
    const clickListener = (e) => {
        const tagName = e.target.tagName.toLowerCase();
        
        if (!utils.includes(focusableElements, tagName)) {
            userInteractions.add(e);
        }
    };
    
    window.addEventListener('focusin', focusInListener);
    document.addEventListener('click', clickListener)
};

/**
 * Enables the event listener for sending analytics event.
 */
const enablePageLeaveListener = () => {
    window.addEventListener('beforeunload', broker.sendAnalyticsData);
};

export default {
    enableErrorListener,
    enableUserInteractionsListener,
    enablePageLeaveListener
};