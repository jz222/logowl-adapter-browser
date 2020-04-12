import broker from '../broker/index';

const enable = () => {
    window.onerror = (message, file, line, column, error = {}) => {
        column = column || (window.event && window.event.errorCharacter);
        
        const errorEvent = { message, file, line, column, stacktrace: error.stack, constructor: error.constructor };
        
        broker.registerError(errorEvent);
        
        return false;
    };
};

export default { enable };