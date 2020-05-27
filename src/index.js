import eventListener from './eventListener/index';
import interceptors from './interceptors/index';
import constants from './constants/index';
import analytics from './analytics/index';
import broker from './broker/index';
import banner from './banner/index';
import config from './config/index';
import utils from './utils/index';

/**
 * Enables sending analytic data.
 */
const enableAnalytics = () => {
    config.setSendAnalytics(true);
    analytics.setBasicAnalyticData();
    
    // Due to technical limitations the analytic
    // data is sent instantaneously on mobile
    // devices and not when the page unloaded.
    if (constants.isMobile) {
        broker.sendAnalyticsData();
    } else {
        eventListener.enablePageLeaveListener();
    }
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
        banner.render(enableAnalytics, userConfig.bannerText, userConfig.bannerAcceptLabel, userConfig.bannerRejectLabel);
    }
    
    interceptors.enableAll();
    eventListener.enableUserInteractionsListener();
    eventListener.enableErrorListener();
    
    if (userConfig.sendAnalytics) {
        analytics.setBasicAnalyticData();
        
        // Due to technical limitations the analytic
        // data is sent instantaneously on mobile
        // devices and not when the page unloaded.
        if (constants.isMobile) {
            broker.sendAnalyticsData();
        } else {
            eventListener.enablePageLeaveListener();
        }
    }
};

/**
 * Emits an error.
 * @param error {object} error object
 */
const emitError = (error) => {
    const stacktrace = utils.parseStacktrace(error);
    
    error.line = stacktrace.line;
    error.path = stacktrace.path;
    
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