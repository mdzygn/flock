const stopWords = 'i, me, my, myself, we, our, ours, ourselves, you, your, yours, yourself, yourselves, he, him, his, himself, she, her, hers, herself, it, its, itself, they, them, their, theirs, themselves, what, which, who, whom, this, that, these, those, am, is, are, was, were, be, been, being, have, has, had, having, do, does, did, doing, a, an, the, and, but, if, or, because, as, until, while, of, at, by, for, with, about, against, between, into, through, during, before, after, above, below, to, from, up, down, in, out, on, off, over, under, again, further, then, once, here, there, when, where, why, how, all, any, both, each, few, more, most, other, some, such, no, nor, not, only, own, same, so, than, too, very, s, t, can, will, just, don, should, now';
const stopWordsExpression = new RegExp('\\b' + stopWords.split(', ').join('\\b|\\b') + '\\b', 'ig');

const commonWordNounSuffixes = 'acy, cy, al, ance, ence, dom, ery, ry, er, eer, or, ism, izm, ist, ity, ty, ment, ent, ant, iness, ness, ship, sion, tion, age, th';
const commonWordVerbSuffixes = 'ate, ten, en, ted, ed, ify, fy, ise, ize, ing';
const commonWordAdverbSuffixes = 'ward, wards, wise, ly';
const commonWordAdjectiveSuffixes = 'able, ible, al, esque, est, ful, ical, ic, ious, ous, ish, ive, y'; // do not include less as means opposite
const commonWordMiscSuffixes = 'ur'; // colour, behaviour
const commonWordPluralSuffixes = 'ers, ors, ies, es, s';
const commonWordSuffixes = sortStringItemsByLength(commonWordNounSuffixes + ', ' + commonWordVerbSuffixes + ', ' + commonWordAdverbSuffixes + ', ' + commonWordAdjectiveSuffixes + ', ' + commonWordMiscSuffixes + ', ' + commonWordPluralSuffixes);

const commonWordSuffixesExpression = '(\\w{3,})(' + commonWordSuffixes.split(', ').join(')\\b|(\\w{3,})(') + ')\\b';
// const commonWordSuffixesRegex = new RegExp('(\\w{3,})' + commonWordSuffixes.split(', ').join('\\b|(\\w{3,})') + '\\b', 'ig');
// const commonWordSuffixesRegex = new RegExp('\\B' + commonWordSuffixes.split(', ').join('\\b|\\B') + '\\b', 'ig');

function sortStringItemsByLength(string) {
    const items = string.split(', ');
    items.sort(function(a, b){
        return b.length - a.length;
    });
    return items.join(', ');
}

export function removeCommonWordSuffixes(string) {
    const commonWordSuffixesRegex = new RegExp(commonWordSuffixesExpression, 'i'); // 'ig');

    let outputString = string;

    let trialIndex = 0;

    let match, groupI, startIndex, endIndex;
    while((match = commonWordSuffixesRegex.exec(outputString)) !== null && trialIndex++ < 100) {
        for (groupI = 1; groupI < match.length; groupI++) {
            if (match[groupI] !== undefined) {
                startIndex = match.index + match[groupI].length;
                endIndex = startIndex + match[groupI + 1].length;
                outputString = outputString.substr(0, startIndex) + outputString.substr(endIndex);
                break;
            }
        }
    }

    return outputString;
    // return string.replace(commonWordSuffixesRegex, '');
}

export function getOrWordsExpression(string, requireFullWords) {
    if (requireFullWords) {
        string = '\\b' + string.split(' ').join('\\b|\\b') + '\\b';
    } else {
        string = string.split(' ').join('|');
    }
    return new RegExp(string, 'i');
}

export function getAndWordsExpression(string, requireFullWords) {
    if (requireFullWords) {
        string = '(?=.*\\b' + string.split(' ').join('\\b)(?=.*\\b') + '\\b).+';
    } else {
        string = '(?=.*' + string.split(' ').join(')(?=.*') + ').+';
        // (?=.*\bmeat\b)(?=.*\bpasta\b)(?=.*\bdinner\b).+
    }
    return new RegExp(string, 'ig');
}

export function removeStopWords(string) {
    return string.replace(stopWordsExpression, '');
}

export function getSearchString(string) {
    string = string.toLowerCase().trim();
    string = removeStopWords(string);
    string = string.replace(/\s+/g, ' ');
    return string;
}