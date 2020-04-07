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
    return text ? text.replace(/<br\/>/g, '\r\n') : text;
}

export function getUnformattedText(text) {
    return text ? text.replace(/\r?\n/g, '<br/>') : text;
}

export function getUnbrokenText(text) {
    return text ? text.replace(/<br\/>/g, '&nbsp;&nbsp;') : text;
}

export function testInputDefocus(event, options) {
    const actionOnCtrl = options && options.actionOnCtrl;
    // const isActionKeyAllowed = (!actionOnCtrl && !event.ctrlKey) || (actionOnCtrl && event.ctrlKey);
    const keyCode = event.keyCode;
    if ((keyCode === 13 || keyCode == 10) && event.target && event.target.blur) { //&& isActionKeyAllowed) {
        if (options && options.action && (!actionOnCtrl || event.ctrlKey)) {
            event.target.blur();
            options.action();
        } else if (options && options.target) {
            event.target.blur();
            event.preventDefault();
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

export function getDateAgeString(date) {
    if (!date) { return null; }

    const curDate = new Date(date);

    var ageDiff = Date.now() - curDate;
    // var ageDate = new Date(ageDifMs);
    // return Math.abs(ageDate.getUTCFullYear() - 1970);

    const secondsDiff = ageDiff / 1000;
    const minsDiff = secondsDiff / 60;
    const hoursDiff = minsDiff / 60;
    const daysDiff = hoursDiff / 24;
    const weeksDiff = daysDiff / 7;
    const monthsDiff = weeksDiff / 4;
    const yearsDiff = monthsDiff / 12;

    let ageString = '';

    if (yearsDiff > 1.66) {
        ageString = Math.round(yearsDiff) + ' years';
    } else if (yearsDiff > 1) {
        ageString = '1 year';

    } else if (monthsDiff > 1.66) {
        ageString = Math.round(monthsDiff) + ' months';
    } else if (monthsDiff > 1) {
        ageString = '1 month';

    } else if (weeksDiff > 1.66) {
        ageString = Math.round(weeksDiff) + ' weeks';
    } else if (weeksDiff > 1) {
        ageString = '1 week';

    } else if (daysDiff > 1.66) {
        ageString = Math.round(daysDiff) + ' days';
    } else if (daysDiff > 0.66) {
        ageString = '1 day';

    } else if (hoursDiff > 1.66) {
        ageString = Math.round(hoursDiff) + ' hours';
    } else if (hoursDiff > 0.66) {
        ageString = '1 hour';

    } else if (minsDiff > 1.66) {
        ageString = Math.round(minsDiff) + ' mins';
    } else if (minsDiff > 1) {
        ageString = '1 min';
    } else {
        ageString = 'less than a minute';
    }
    // } else {
    //     ageString = '1 min';
    // }
    ageString += ' ago'

    return ageString;
}

export function getDateString(date) {
    if (!date) { return null; }

    const curDate = new Date(date);
    return formatDate(curDate, 'd MMM h:mmtt');
}

function formatDate(date, format, utc) {
    var MMMM = ["\x00", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var MMM = ["\x01", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var dddd = ["\x02", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    function ii(i, len) {
        var s = i + "";
        len = len || 2;
        while (s.length < len) s = "0" + s;
        return s;
    }

    var y = utc ? date.getUTCFullYear() : date.getFullYear();
    format = format.replace(/(^|[^\\])yyyy+/g, "$1" + y);
    format = format.replace(/(^|[^\\])yy/g, "$1" + y.toString().substr(2, 2));
    format = format.replace(/(^|[^\\])y/g, "$1" + y);

    var M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
    format = format.replace(/(^|[^\\])MMMM+/g, "$1" + MMMM[0]);
    format = format.replace(/(^|[^\\])MMM/g, "$1" + MMM[0]);
    format = format.replace(/(^|[^\\])MM/g, "$1" + ii(M));
    format = format.replace(/(^|[^\\])M/g, "$1" + M);

    var d = utc ? date.getUTCDate() : date.getDate();
    format = format.replace(/(^|[^\\])dddd+/g, "$1" + dddd[0]);
    format = format.replace(/(^|[^\\])ddd/g, "$1" + ddd[0]);
    format = format.replace(/(^|[^\\])dd/g, "$1" + ii(d));
    format = format.replace(/(^|[^\\])d/g, "$1" + d);

    var H = utc ? date.getUTCHours() : date.getHours();
    format = format.replace(/(^|[^\\])HH+/g, "$1" + ii(H));
    format = format.replace(/(^|[^\\])H/g, "$1" + H);

    var h = H > 12 ? H - 12 : H == 0 ? 12 : H;
    format = format.replace(/(^|[^\\])hh+/g, "$1" + ii(h));
    format = format.replace(/(^|[^\\])h/g, "$1" + h);

    var m = utc ? date.getUTCMinutes() : date.getMinutes();
    format = format.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
    format = format.replace(/(^|[^\\])m/g, "$1" + m);

    var s = utc ? date.getUTCSeconds() : date.getSeconds();
    format = format.replace(/(^|[^\\])ss+/g, "$1" + ii(s));
    format = format.replace(/(^|[^\\])s/g, "$1" + s);

    var f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
    format = format.replace(/(^|[^\\])fff+/g, "$1" + ii(f, 3));
    f = Math.round(f / 10);
    format = format.replace(/(^|[^\\])ff/g, "$1" + ii(f));
    f = Math.round(f / 10);
    format = format.replace(/(^|[^\\])f/g, "$1" + f);

    var T = H < 12 ? "AM" : "PM";
    format = format.replace(/(^|[^\\])TT+/g, "$1" + T);
    format = format.replace(/(^|[^\\])T/g, "$1" + T.charAt(0));

    var t = T.toLowerCase();
    format = format.replace(/(^|[^\\])tt+/g, "$1" + t);
    format = format.replace(/(^|[^\\])t/g, "$1" + t.charAt(0));

    var tz = -date.getTimezoneOffset();
    var K = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
    if (!utc) {
        tz = Math.abs(tz);
        var tzHrs = Math.floor(tz / 60);
        var tzMin = tz % 60;
        K += ii(tzHrs) + ":" + ii(tzMin);
    }
    format = format.replace(/(^|[^\\])K/g, "$1" + K);

    var day = (utc ? date.getUTCDay() : date.getDay()) + 1;
    format = format.replace(new RegExp(dddd[0], "g"), dddd[day]);
    format = format.replace(new RegExp(ddd[0], "g"), ddd[day]);

    format = format.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
    format = format.replace(new RegExp(MMM[0], "g"), MMM[M]);

    format = format.replace(/\\(.)/g, "$1");

    return format;
};