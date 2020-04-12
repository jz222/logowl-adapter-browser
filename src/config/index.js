const config = () => {
    let _config = {
        sendAnalytics: false,
    };
    
    const set = (userConfig = {}) => {
        if (typeof userConfig !== 'object' || userConfig.constructor !== Object) {
            throw new Error('the provided LOGGY config is not a valid object');
        }
        
        if (!userConfig.ticket || typeof userConfig.ticket !== 'string' || userConfig.ticket.length !== 50) {
            throw new Error('the provided LOGGY ticket is invalid');
        }
        
        if (userConfig.badges && userConfig.badges.constructor !== Object) {
            throw new Error('the provided LOGGY badges need to be an object');
        }
        
        Object.keys(userConfig.badges || {}).forEach(badge => {
            if (typeof userConfig.badges[badge] !== 'string') {
                throw new Error('LOGGY badges can only contain strings');
            }
        });
        
        _config = { ..._config, ...userConfig };
    };
    
    const get = () => _config;
    
    return { set, get };
};

export default config();