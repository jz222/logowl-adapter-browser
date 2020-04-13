import utils from '../utils/index';

const userInteractions = () => {
    const userInteractions = [];
    
    const add = (e) => {
        const userInteraction = {
            timestamp: utils.generateUTCInSeconds(),
            element: e.target.tagName.toLowerCase(),
            outerHtml: e.target.outerHTML.replace(/"/g, `'`),
            elementId: e.target.id,
            path: e.path.map(node => {
                if (node === window) {
                    return 'window';
                }
                
                if (node === document) {
                    return 'document';
                }
                
                return (node.tagName || '').toLowerCase();
            })
        };
        
        userInteractions.push(userInteraction);
        
        if (userInteractions.length > 20) {
            userInteractions.shift();
        }
    };
    
    const get = () => userInteractions;
    
    return { add, get };
};

export default userInteractions();