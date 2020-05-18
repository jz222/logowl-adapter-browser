import constants from '../constants/index';
import config from '../config/index';

/**
 * Manages and stores analytic data.
 * @returns {{add: add, get: (function(): {}), setBasicAnalyticData: setBasicAnalyticData}}
 */
const analytics = () => {
    let _analyticData = {};
    let _entryPointTimestamp = new Date();
    
    /**
     * Sets analytic data.
     * @param data {object} data that should be stored.
     */
    const add = (data) => {
        if (!data || typeof data !== 'object' || data.constructor !== Object) {
            return;
        }
        
        _analyticData = { ..._analyticData, ...data };
    };
    
    /**
     * Sets basic analytic data.
     */
    const setBasicAnalyticData = () => {
        const urlBlacklist = config.get().urlBlacklist;
        
        const pathname = window.location.pathname;
        
        _analyticData.isNewVisitor = localStorage.getItem(constants.consentKey) === null;
        _analyticData.isNewSession = sessionStorage.getItem(constants.sessionKey) === null;
        _analyticData.page = pathname[0] === '/' ? pathname : '/' + pathname;
        _analyticData.referrer = document.referrer || 'direct';
        
        if (urlBlacklist) {
            for (let i = 0; i < urlBlacklist.length; i++) {
                if (_analyticData.page.indexOf(urlBlacklist[i]) !== -1) {
                    _analyticData.page = 'blacklisted';
                    break;
                }
            }
        }
        
        localStorage.setItem(constants.consentKey, 'true');
        sessionStorage.setItem(constants.sessionKey, 'true');
    };
    
    /**
     * Returns the stored analytic data.
     * @returns {{}}
     */
    const get = () => {
        _analyticData.timeOnPage = Math.floor((new Date() - _entryPointTimestamp) / 1000);
        
        return _analyticData;
    };
    
    return { add, setBasicAnalyticData, get };
};

export default analytics();