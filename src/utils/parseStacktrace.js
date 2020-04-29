const parseStacktrace = (error) => {
    let syntheticError = false;
    
    // If there is no stack property create a synthetic one
    if (!error.stack) {
        syntheticError = true;
        
        try {
            synthethicError();
        } catch (err) {
            error.stack = err.stack;
        }
    }
    
    let prefix = '';
    
    // Chrome
    if (error.stack[0] === '@') {
        prefix = '@';
    }
    
    // Firefox
    // Not using includes for IE11 compatibility
    if (error.stack.split('').splice(0, 3).join('') === 'at ') {
        prefix = 'at ';
    }
    
    // Safari
    // Not using includes for IE11 compatibility
    if (error.stack.split('').splice(0, 12).join('') === 'global code@') {
        prefix = 'global code@';
    }
    
    let lastStacktrace = (error.stack).replace(prefix, '').split('\n');
    
    if (syntheticError) {
        delete lastStacktrace[1];
    }
    
    lastStacktrace = lastStacktrace.filter(Boolean);
    lastStacktrace = lastStacktrace.length > 1 ? lastStacktrace[1] : lastStacktrace[0];
    
    const splitStacktrace = lastStacktrace.split(':');
    
    const line = splitStacktrace[splitStacktrace.length - 2];
    const path = splitStacktrace.slice(0, -2).join(':').trim();
    
    return { line, path };
};

export default parseStacktrace;