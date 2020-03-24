export function generateId() {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return 'xxxxxxxx'.replace(/x/g, function() {
        return chars[Math.floor(Math.random() * chars.length)];
    });
}