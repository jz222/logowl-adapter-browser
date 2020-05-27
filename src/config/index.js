/**
 * Validates and stores the user configuration.
 * @returns {{set: set, get: (function(): {sendAnalytics: boolean})}}
 */
const config = () => {
    let _config = {
        sendAnalytics: false,
        anonymizeData: true
    };
    
    /**
     * Stores the provided user configuration.
     * @param userConfig {object} the configuration provided by the user.
     */
    const set = (userConfig = {}) => {
        if (typeof userConfig !== 'object' || userConfig.constructor !== Object) {
            throw new Error('the provided Log Owl config is not a valid object');
        }
        
        if (!userConfig.ticket || typeof userConfig.ticket !== 'string' || userConfig.ticket.length !== 50) {
            throw new Error('the provided Log Owl ticket is invalid');
        }
        
        if (userConfig.badges && userConfig.badges.constructor !== Object) {
            throw new Error('the provided Log Owl badges need to be an object');
        }
        
        if (userConfig.urlBlacklist && !Array.isArray(userConfig.urlBlacklist)) {
            throw new Error('the provided Log Owl URL blacklist needs to be an array');
        }
        
        Object.keys(userConfig.badges || {}).forEach(badge => {
            if (typeof userConfig.badges[badge] !== 'string') {
                throw new Error('Log Owl badges can only contain strings');
            }
        });
        
        _config = { ..._config, ...userConfig };
    };
    
    /**
     * Sets sendAnalytics of the user configuration.
     * @param sendAnalytics {boolean} determines if analytics should be sent or not
     * @returns {{[p: string]: *, sendAnalytics: *}}
     */
    const setSendAnalytics = (sendAnalytics) => _config = { ..._config, sendAnalytics };
    
    /**
     * Returns the stored user configuration.
     * @returns {{sendAnalytics: boolean}} the user configuration
     */
    const get = () => _config;
    
    return { set, setSendAnalytics, get };
};

export default config();