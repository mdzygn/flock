export function generateId(length) {
    if (!length) {
        length = 8;
    }
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const idBase = new Array(length + 1).join('x');
    return idBase.replace(/x/g, function() {
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

        if (options && options.action) {
            options.action();
        } else if (options && options.target) {
            options.target.focus();
        }
    }
}

export function copyToClipboard(string) {
    const textArea = document.createElement('textarea');
    textArea.style.top = 0;
    textArea.style.display = 'absolute';
    textArea.style.visible = 'hidden';
    textArea.value = string;

    document.body.appendChild(textArea);

    textArea.select();
    try {
        document.execCommand('copy');
    } catch (err) {}

    document.body.removeChild(textArea);
}


export function formatAsId(string, maxLength, spaceReplaceString) {
    if (!spaceReplaceString) {
        spaceReplaceString = '';
    }
    let newString = '';
    if (string) {
        newString = string.toLowerCase();
        newString = newString.replace(/\s+/g,'');
        newString = newString.replace(/[^a-z0-9]+/g,'');

        if (maxLength && newString.length > maxLength) {
            newString = newString.substr(0, maxLength);
        }
    }
    return newString;
}