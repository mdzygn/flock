const stopWords = 'i, me, my, myself, we, our, ours, ourselves, you, your, yours, yourself, yourselves, he, him, his, himself, she, her, hers, herself, it, its, itself, they, them, their, theirs, themselves, what, which, who, whom, this, that, these, those, am, is, are, was, were, be, been, being, have, has, had, having, do, does, did, doing, a, an, the, and, but, if, or, because, as, until, while, of, at, by, for, with, about, against, between, into, through, during, before, after, above, below, to, from, up, down, in, out, on, off, over, under, again, further, then, once, here, there, when, where, why, how, all, any, both, each, few, more, most, other, some, such, no, nor, not, only, own, same, so, than, too, very, s, t, can, will, just, don, should, now';
const stopWordsExpression = new RegExp('\\b' + stopWords.split(', ').join('\\b|\\b') + '\\b', 'ig');

const contextStopWords = 'worlds?, dream(s|ing)?, big, small, reality, realities, spaces?, places?, build(s|ing)?, creat(es|ing)?, mak(es|ing)?, discover, help, ground, provid(es|ing)?, develop(ing)?, links?'; // see(ing)?, hear(ing)?, feel(s|ing)?, projects?, support(s|ing)?, find(ing)?,
const contextStopWordsExpression = new RegExp('\\b' + contextStopWords.split(', ').join('\\b|\\b') + '\\b', 'ig');

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

export function removeContextStopWords(string) {
    return string.replace(contextStopWordsExpression, '');
}

export function getSearchString(string) {
    string = string.toLowerCase();
    string = string.replace(/[^\w]+/g, ' ');
    string = removeStopWords(string);
    string = string.replace(/\s+/g, ' ');
    string = string.trim();
    return string;
}

export function filterItemsBySearch(items, options) {
    let {
        searchString,
        fullWordSearchExpression,
        generalisedFullWordSearchExpression,
        searchExpression,
        generalisedSearchExpression,
        appendAllOtherItems,
    } = options;

    if (!searchString) {
        return [...items];
    } else {
        let filteredItems = [];

        let index, item;

        for (index = 0; index < items.length; index++) {
            item = items[index];
            if (itemRegexMatch(item, fullWordSearchExpression)) {
                filteredItems.push(item);
            }
        }

        for (index = 0; index < items.length; index++) {
            item = items[index];
            if (itemRegexMatch(item, generalisedFullWordSearchExpression) && !filteredItems.includes(item)) {
                filteredItems.push(item);
            }
        }

        if (searchExpression.test) {
            for (index = 0; index < items.length; index++) {
                item = items[index];
                if (itemRegexMatch(item, searchExpression) && !filteredItems.includes(item)) {
                    filteredItems.push(item);
                }
            }
        } else {
            for (index = 0; index < items.length; index++) {
                item = items[index];
                if (itemSearchMatch(item, searchExpression) && !filteredItems.includes(item)) {
                    filteredItems.push(item);
                }
            }
        }

        if (generalisedSearchExpression.test) {
            for (index = 0; index < items.length; index++) {
                item = items[index];
                if (itemRegexMatch(item, generalisedSearchExpression) && !filteredItems.includes(item)) {
                    filteredItems.push(item);
                }
            }
        } else {
            for (index = 0; index < items.length; index++) {
                item = items[index];
                if (itemSearchMatch(item, generalisedSearchExpression) && !filteredItems.includes(item)) {
                    filteredItems.push(item);
                }
            }
        }

        if (appendAllOtherItems) {
            for (index = 0; index < items.length; index++) {
                item = items[index];
                if (!filteredItems.includes(item)) {
                    filteredItems.push(item);
                }
            }
        }

        return filteredItems;
    }
}

function itemRegexMatch(item, searchExpression) {
    if (item.tags.match(searchExpression)) {
        return true;
    }
    return false;
}

function itemSearchMatch(item, searchString) {
    if (item.tags.toLowerCase().includes(searchString)) return true;
    return false;
}


export function contextFilterItems(items, contextSearchString) {
    let filteredItems = [];

    let fullWordContextSearchExpression = null;
    let generalisedFullWordContextSearchExpression = null;
    let contextSearchExpression = null;
    let generalisedContextSearchExpression = null;

    let generalisedContextSearchString;

    if (contextSearchString) {
        contextSearchString = getSearchString(contextSearchString);

        generalisedContextSearchString = removeCommonWordSuffixes(contextSearchString);

        fullWordContextSearchExpression = getOrWordsExpression(contextSearchString, true);
        generalisedFullWordContextSearchExpression = getOrWordsExpression(generalisedContextSearchString, true);
        contextSearchExpression = getOrWordsExpression(contextSearchString);
        generalisedContextSearchExpression = getOrWordsExpression(generalisedContextSearchString);
    }

    filteredItems = filterItemsBySearch(items, {
        searchString: contextSearchString,
        fullWordSearchExpression: fullWordContextSearchExpression,
        generalisedFullWordSearchExpression: generalisedFullWordContextSearchExpression,
        searchExpression: contextSearchExpression,
        generalisedSearchExpression: generalisedContextSearchExpression,
        appendAllOtherItems: true,
    });

    return filteredItems;
}

export function filterItems(items, searchString) {
    let filteredItems = [];

    let fullWordSearchExpression = null;
    let generalisedFullWordSearchExpression = null;
    let searchExpression = null;
    let generalisedSearchExpression = null;

    let generalisedSearchString;

    if (searchString) {
        searchString = getSearchString(searchString);

        generalisedSearchString = removeCommonWordSuffixes(searchString);

        const splitWords = searchString.split(' ');
        if (splitWords.length > 1) {
            fullWordSearchExpression = getAndWordsExpression(searchString, true);
            generalisedFullWordSearchExpression = getAndWordsExpression(generalisedSearchString, true);
            searchExpression = getAndWordsExpression(searchString);
            generalisedSearchExpression = getAndWordsExpression(generalisedSearchString);
        } else {
            fullWordSearchExpression = new RegExp('\\b' + searchString + '\\b', 'i');
            generalisedFullWordSearchExpression = new RegExp('\\b' + generalisedSearchString + '\\b', 'i');
            searchExpression = searchString;
            generalisedSearchExpression = generalisedSearchString;
        }
    }

    filteredItems = filterItemsBySearch(items, {
        searchString,
        fullWordSearchExpression,
        generalisedFullWordSearchExpression,
        searchExpression,
        generalisedSearchExpression,
    });

    return filteredItems;
}