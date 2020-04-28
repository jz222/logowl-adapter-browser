import eventListener from './eventListener/index';
import interceptors from './interceptors/index';
import constants from './constants/index';
import analytics from './analytics/index';
import broker from './broker/index';
import banner from './banner/index';
import config from './config/index';

/**
 * Enables sending analytic data.
 */
const enableAnalytics = () => {
    config.setSendAnalytics(true);
    
    eventListener.enablePageLeaveListener();
    analytics.setBasicAnalyticData();
};

/**
 * Initializes the adapter with the provided user config.
 * @param userConfig {object} the config provided by the user
 */
const init = (userConfig) => {
    const hasGivenConsent = localStorage.getItem(constants.consentKey) !== null;
    
    if (!('sendAnalytics' in userConfig)) {
        userConfig.sendAnalytics = hasGivenConsent;
    }
    
    config.set(userConfig);
    
    if (userConfig.showBanner && !hasGivenConsent) {
        banner.render(enableAnalytics);
    }
    
    interceptors.enableAll();
    eventListener.enableUserInteractionsListener();
    eventListener.enableErrorListener();
    
    if (userConfig.sendAnalytics) {
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

/**
 * Disables sending analytic data.
 */
const disableAnalytics = () => {
    config.setSendAnalytics(false);
    
    sessionStorage.removeItem(constants.sessionKey);
    localStorage.removeItem(constants.consentKey);
};

export default { init, emitError, enableAnalytics, disableAnalytics };