export default {
    focusableElements: ['button', 'details', 'input', 'iframe', 'select', 'textarea'],
    connectivity: {
        serviceURL: 'https://api.logowl.io'
    },
    adapter: {
        name: 'logowl-adapter-browser',
        type: 'browser',
        version: 'v2.1.0'
    },
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    consentKey: 'logowl-analytics-enabled',
    sessionKey: 'logowl-analytics-active-session'
};