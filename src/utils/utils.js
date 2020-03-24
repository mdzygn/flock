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