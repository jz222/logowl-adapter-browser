import utils from '../utils/index';

const logs = () => {
    const logs = [];
    
    const add = (log) => {
        if (typeof log !== 'string') {
            return;
        }
        
        logs.push({ timestamp: utils.generateUTCInSeconds(), type: 'log', log });
        
        if (logs.length > 10) {
            logs.shift();
        }
    };
    
    const get = () => logs;
    
    return { add, get };
};

export default logs();