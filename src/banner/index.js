/**
 * Renders a banner that asks the user if they want to be tracked.
 * @param cb {function} function that is called if the user clicks the accept acceptButton
 * @param label {string} text shown on the banner
 * @param acceptButtonText {string} the label of the accept button
 * @param rejectButtonText {string} the label of the reject button
 */
const render = (cb, label = '', acceptButtonText = '', rejectButtonText = '') => {
    const banner = document.createElement('div');
    const caption = document.createElement('p');
    const acceptButton = document.createElement('button');
    const rejectButton = document.createElement('button');
    
    if (!label || typeof label !== 'string') {
        label = 'We would like to collect anonymized data to improve your experience.';
    }
    
    if (!acceptButtonText || typeof acceptButtonText !== 'string') {
        acceptButtonText = 'Accept';
    }
    
    if (!rejectButtonText || typeof rejectButtonText !== 'string') {
        rejectButtonText = 'Cancel';
    }
    
    /**
     * Removes the banner from the DOM and calls
     * executes the callback function.
     */
    const onAccept = () => {
        document.body.removeChild(banner);
        cb();
    };
    
    const onReject = () => {
        document.body.removeChild(banner);
    };
    
    banner.style.position = 'fixed';
    banner.style.right = '20px';
    banner.style.bottom = '25px';
    banner.style.left = '20px';
    banner.style.maxWidth = '510px';
    banner.style.display = 'flex';
    banner.style.justifyContent = 'space-between';
    banner.style.alignItems = 'center';
    banner.style.margin = '0 auto';
    banner.style.padding = '10px';
    banner.style.borderRadius = '7px';
    banner.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
    banner.style.boxShadow = 'rgba(190, 210, 250, 0.8) 0 2px 20px 0';
    banner.style.backdropFilter = 'blur(20px)';
    banner.style.boxSizing = 'border-box';
    banner.id = 'loggy-banner';
    
    caption.style.margin = '0';
    caption.style.fontFamily = 'Helvetica, sans-serif';
    caption.style.fontSize = '12px';
    caption.style.color = '#5B6F8C';
    caption.innerText = label;
    
    acceptButton.style.padding = '5px 10px';
    acceptButton.style.border = 'none';
    acceptButton.style.borderRadius = '4px';
    acceptButton.style.backgroundColor = '#0368ff';
    acceptButton.style.fontFamily = 'Helvetica, sans-serif';
    acceptButton.style.fontSize = '12px';
    acceptButton.style.color = 'white';
    acceptButton.style.outline = 'none';
    acceptButton.style.cursor = 'pointer';
    acceptButton.innerText = acceptButtonText;
    acceptButton.onclick = onAccept;
    
    rejectButton.style.padding = '5px 10px';
    rejectButton.style.border = 'none';
    rejectButton.style.backgroundColor = 'none';
    rejectButton.style.fontFamily = 'Helvetica, sans-serif';
    rejectButton.style.fontWeight = '500';
    rejectButton.style.color = '#5B6F8C';
    rejectButton.style.cursor = 'pointer';
    rejectButton.innerText = rejectButtonText;
    rejectButton.onclick = onReject;
    
    banner.appendChild(caption);
    banner.appendChild(rejectButton);
    banner.appendChild(acceptButton);
    
    window.onload = () => document.body.appendChild(banner);
};

export default { render };