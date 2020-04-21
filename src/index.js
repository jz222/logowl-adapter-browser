import eventListener from './eventListener/index';
import interceptors from './interceptors/index';
import analytics from './analytics/index';
import broker from './broker/index';
import config from './config/index';

/**
 * Initializes the adapter with the provided user config.
 * @param userConfig {object} the config provided by the user
 */
const init = (userConfig) => {
    config.set(userConfig);
    
    interceptors.enableAll();
    eventListener.enableUserInteractionsListener();
    eventListener.enableErrorListener();
    
    if (userConfig.enableAnalytics) {
        eventListener.enablePageLeaveListener();
        analytics.setBasicAnalyticData();
    }
};

/**
 * Emits an error.
 * @param error {object} error object
 */
const emitError = (error) => {
    const lastStacktrace = error.stack.replace('at ', '').split('\n')[1] || '';
    const splitStacktrace = lastStacktrace.split(':');
    
    error.line = splitStacktrace[splitStacktrace.length - 2];
    error.path = splitStacktrace.slice(0, -2).join(':').trim();
    
    broker.registerError(error);
};

export default { init, emitError };