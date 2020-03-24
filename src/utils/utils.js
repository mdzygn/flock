export function generateId() {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return 'xxxxxxxx'.replace(/x/g, function() {
        return chars[Math.floor(Math.random() * chars.length)];
    });
}

export function getFormattedText(text) {
    return text.replace(/<br\/>/g, '\r\n');
}

export function getUnformattedText(text) {
    return text.replace(/\r?\n/g, '<br/>');
}

export function testInputDefocus(event, options) {
    if (event.keyCode === 13 && event.target && event.target.blur) {
        event.target.blur();
        event.preventDefault();

        if (options && options.target) {
            options.target.focus();
        }
    }
}