const analytics = () => {
    let _analyticData = {};
    let _entryPointTimestamp = new Date();
    
    const add = (data) => {
        if (!data || typeof data !== 'object' || data.constructor !== Object) {
            return;
        }
        
        _analyticData = { ..._analyticData, ...data };
    };
    
    const setBasicAnalyticData = () => {
        const pathname = window.location.pathname;
        
        _analyticData.isNewPageVisitor = localStorage.getItem('loggy-analytics-enabled') === null;
        _analyticData.entryPage = pathname[0] === '/' ? pathname : '/' + pathname;
        _analyticData.referrer = "google";
        
        localStorage.setItem('loggy-analytics-enabled', 'true');
    };
    
    const get = () => {
        _analyticData.timeOnPage = Math.floor((new Date() - _entryPointTimestamp) / 1000);
        
        return _analyticData;
    };
    
    return { add, setBasicAnalyticData, get };
};

export default analytics();