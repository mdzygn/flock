const delayedTimeouts = {};

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

export function getLinkFormattedText(text) {
    const urlLinkRegex = /(<a href=")?(?:https?:\/\/|www)(?:[-A-Za-z0-9+&@#\/%?=~_|$!:.,;]+\.)+[-A-Za-z0-9+&@#\/%?=~_|$!]+/ig;
    // const urlLinkRegex = /(<a href=")?(?:https?:\/\/)?(?:(?:www)[-A-Za-z0-9+&@#\/%?=~_|$!:.,;]+\.)+[-A-Za-z0-9+&@#\/%?=~_|$!]+/ig;
    // const urlLinkRegex = /(<a href=")?(?:https?:\/\/)?(?:[-A-Za-z0-9+&@#\/%?=~_|$!:.,;]+\.)+[-A-Za-z0-9+&@#\/%?=~_|$!]{2,8}/ig;
    text = text.replace(urlLinkRegex, function ( fullMatch, aTagMatch ) {
        if(/^https?:\/\/.+/i.test(fullMatch)) {
            return aTagMatch ? fullMatch : '<a href="'+fullMatch+'" target="_blank" onClick="event && event.stopPropagation()">'+fullMatch+'</a>';
        } else {
            return aTagMatch ? fullMatch : '<a href="http://'+fullMatch+'" target="_blank" onClick="event && event.stopPropagation()">'+fullMatch+'</a>';
        }
    });

    const mailLinkRegex = /(<a href="(?:mailto:)?)?[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,8})+/ig;
    // const mailLinkRegex = /(<a href=")?(?:mailto:)?[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,8})+/ig;
    text = text.replace(mailLinkRegex, function ( fullMatch, aTagMatch ) {
        return aTagMatch ? fullMatch : '<a href="mailto:'+fullMatch+'" onClick="event && event.stopPropagation()">'+fullMatch+'</a>';
    });

    return text;
}

export function stripLinks(text) {
    text = text.replace(/<\/?a(?:(?= )[^>]*)?>/ig, '');
    return text;
}

export function getDisplayText(text, options) {
    if (text) {
        if (!options || !options.disallowLinks) {
            text = getLinkFormattedText(text);
        }
        if (options && options.disallowLinks) {
            text = stripLinks(text);
        }
        if (options && options.collapseBreaks) {
            text = text.replace(/\r?\n/g, '&nbsp;&nbsp;');
            text = text.replace(/<br\/>/g, '&nbsp;&nbsp;');
        } else {
            text = text.replace(/\r?\n/g, '<br/>');
        }
    }
    return text;
}


// export function parseHTML(string) {
//     if (string) {
//         string = linkify(string);
//     }
//     return string;
// }

// export function linkify(string) {
//     // http://, https://, ftp://
//     var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;

//     // www. sans http:// or https://
//     var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;

//     // Email addresses
//     var emailAddressPattern = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim;

//     return string
//         .replace(urlPattern, '<a href="$&" target="_blank" onClick="event && event.stopPropagation()">$&</a>')
//         .replace(pseudoUrlPattern, '$1<a href="http://$2" target="_blank" onClick="event && event.stopPropagation()">$2</a>')
//         .replace(emailAddressPattern, '<a href="mailto:$&" onClick="event && event.stopPropagation()">$&</a>');

//     // /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm,
// };

export function testInputDefocus(event, options) {
    const actionOnCtrl = options && options.actionOnCtrl;
    // const isActionKeyAllowed = (!actionOnCtrl && !event.ctrlKey) || (actionOnCtrl && event.ctrlKey);
    const keyCode = event.keyCode;
    if ((keyCode === 13 || keyCode == 10) && event.target && event.target.blur) { //&& isActionKeyAllowed) {
        if (options && options.action && (!actionOnCtrl || event.ctrlKey)) {
            if (!options.preventBlur) {
                event.target.blur();
            } else {
                event.target.focus(); // ensure focused
                event.preventDefault();
            }
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

export function getDateAge(date) {
    const dateAge = {};

    const curDate = new Date(date);

    var age = Date.now() - curDate;
    // var ageDate = new Date(ageDifMs);
    // return Math.abs(ageDate.getUTCFullYear() - 1970);

    dateAge.seconds = age / 1000;
    dateAge.mins = dateAge.seconds / 60;
    dateAge.hours = dateAge.mins / 60;
    dateAge.days = dateAge.hours / 24;
    dateAge.weeks = dateAge.days / 7;
    dateAge.months = dateAge.weeks / 4;
    dateAge.years = dateAge.months / 12;

    return dateAge;
}

export function getDateAgeString(date, options) {
    if (!date) { return null; }

    const dateAge = getDateAge(date);

    const allowLessThanMinute = options ? options.allowLessThanMinute : true;

    let ageString = '';

    if (dateAge.years > 1.66) {
        ageString = Math.round(dateAge.years) + ' years';
    } else if (dateAge.years > 1) {
        ageString = '1 year';

    } else if (dateAge.months > 1.66) {
        ageString = Math.round(dateAge.months) + ' months';
    } else if (dateAge.months > 1) {
        ageString = '1 month';

    } else if (dateAge.weeks > 1.66) {
        ageString = Math.round(dateAge.weeks) + ' weeks';
    } else if (dateAge.weeks > 1) {
        ageString = '1 week';

    } else if (dateAge.days > 1.66) {
        ageString = Math.round(dateAge.days) + ' days';
    } else if (dateAge.days > 0.66) {
        ageString = '1 day';

    } else if (dateAge.hours > 1.66) {
        ageString = Math.round(dateAge.hours) + ' hours';
    } else if (dateAge.hours > 0.66) {
        ageString = '1 hour';

    } else if (dateAge.mins > 1.66) {
        ageString = Math.round(dateAge.mins) + ' mins';
    } else if (dateAge.mins > 1 || !allowLessThanMinute) {
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

export function secondsDiff(date1, date2) {
    if (date1 && date2) {
        return (date2 - date1) / 1000;
    }
    return 0;
}

export function getDateString(date, format) {
    if (!date) { return null; }
    if (!format) {
        format = 'd MMM h:mmtt';
    }

    const curDate = new Date(date);
    return formatDate(curDate, format);
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

export function getMessageTime(date) {
    let dateString = '';
    if (date) {
        // dateDebugOffset.set(60 * 60 * 1000 * (12 + 24 + 8) + (4) * (60) * 1000);
        // date = (new Date()).getTime() - $dateDebugOffset;
        // console.log('date', date, getDateString(date));

        const dateAge = getDateAge(date);

        const DAY_MILLISECONDS = 24*60*60*1000;
        let todaysDate = (new Date()).setHours(0,0,0,0) / DAY_MILLISECONDS;
        let curDate = (new Date(date)).setHours(0,0,0,0) / DAY_MILLISECONDS;
        let dateDiff = todaysDate - curDate;
        // console.log('dateDiff', dateDiff);

        // if (dateAge.days < 1) {
        if (dateDiff < 1) {
            dateString = 'Today at ' + getDateString(date, 'h:mmtt');
        } else if (dateDiff < 2) {
            dateString = 'Yesterday at ' + getDateString(date, 'h:mmtt');
        } else if (dateAge.weeks < 1) {
            dateString = getDateString(date, 'dddd') + ' at ' + getDateString(date, 'h:mmtt');
        } else {
            dateString = getDateString(date, 'd MMM') + ' at ' + getDateString(date, 'h:mmtt');
        }
    }
    return dateString;
}

export function validateEmail(email) {
    return email && email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]{2,}\.[A-Z]{2,8}$/i);
}

export function validateUserName(username) {
    // reference USER_NAME_MIN_LENGTH, USER_NAME_MAX_LENGTH
    return username && username.length >= 3 && username.length <= 16 && username.match(/^(?!.*\.\.)(?!.*__)(?!.*\._)(?!.*_\.)(?!.*\.$)(?!\..*$)[a-z0-9._]+$/); // lowercase only
    // return username && username.match(/^(?=.{4,16}$)(?![_.])(?!.*[_.]{2})[a-z0-9._]+(?<![_.])$/); // lowercase only
    // return username && username.match(/^(?=.{4,16}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/i);
}


export function delayedTimeout(id, callback, delay) {
    if (typeof window !== 'undefined') {
        if (delayedTimeouts[id]) {
            window.clearTimeout(delayedTimeouts[id]);
            delayedTimeouts[id] = null;
        }
        delayedTimeouts[id] = window.setTimeout(() => {
            callback();
        }, delay);
    }
}

export function getSplitItems(items) {
    if (typeof items === 'string') {
        items = items.split(',').map((item) => item.trim());
    }
    return items;
}

export function objectsMatch(objectA, objectB) {
    return JSON.stringify(objectA) === JSON.stringify(objectB);
    // Object.entries(k1).toString() === Object.entries(k2).toString();
}

export function strCompare(stringA, stringB) {
    if (stringA && stringB) {
        return lineBreakUniform(stringA) === lineBreakUniform(stringB);
    } else {
        return stringA === stringB;
    }
}

export function lineBreakUniform(string) {
    if (string) {
        return string.replace(/\r\n/g, '\n');
    } else {
        return string;
    }
}

export function getEllipsisText(string, maxLength) {
    if (string.length > maxLength) {
        string = string.substring(0, maxLength) + '&hellip;';
    }
    return string;
}

export function trim(text) {
    if (text && typeof text === 'string') {
        return text.trim();
    } else {
        return '';
    }
}