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

export function shuffle(array) {
    let sourceArray = [...array];

    const newArray = [];
    let index;
    while (sourceArray.length > 0) {
        index = Math.floor(Math.random() * sourceArray.length);
        newArray.push(sourceArray.splice(index, 1)[0]);
    }

    return newArray;
}

export function parseHTML(string) {
    if (string) {
        string = linkify(string);
    }
    return string;
}

export function linkify(string) {
    // http://, https://, ftp://
    var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;

    // www. sans http:// or https://
    var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;

    // Email addresses
    var emailAddressPattern = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim;

    return string
        .replace(urlPattern, '<a href="$&" target="_blank" onClick="event && event.stopPropagation()">$&</a>')
        .replace(pseudoUrlPattern, '$1<a href="http://$2" target="_blank" onClick="event && event.stopPropagation()">$2</a>')
        .replace(emailAddressPattern, '<a href="mailto:$&" onClick="event && event.stopPropagation()">$&</a>');

    // /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm,
};