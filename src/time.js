define([], function () {
    'use strict';

    const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    function niceElapsedTime(dateObj, nowDateObj) {
        let date;
        if (typeof dateObj === 'string') {
            date = new Date(dateObj);
        } else if (typeof dateObj === 'number') {
            date = new Date(dateObj);
        } else {
            date = dateObj;
        }

        let now;
        if (nowDateObj === undefined) {
            now = new Date();
        } else if (typeof nowDateObj === 'string') {
            now = new Date(nowDateObj);
        } else {
            now = nowDateObj;
        }

        const elapsed = Math.round((now.getTime() - date.getTime()) / 1000);
        const elapsedAbs = Math.abs(elapsed);

        let measure, measureAbs, unit;
        if (elapsedAbs < 60 * 60 * 24 * 7) {
            if (elapsedAbs === 0) {
                return 'now';
            } else if (elapsedAbs < 60) {
                measure = elapsed;
                measureAbs = elapsedAbs;
                unit = 'second';
            } else if (elapsedAbs < 60 * 60) {
                measure = Math.round(elapsed / 60);
                measureAbs = Math.round(elapsedAbs / 60);
                unit = 'minute';
            } else if (elapsedAbs < 60 * 60 * 24) {
                measure = Math.round(elapsed / 3600);
                measureAbs = Math.round(elapsedAbs / 3600);
                unit = 'hour';
            } else if (elapsedAbs < 60 * 60 * 24 * 7) {
                measure = Math.round(elapsed / (3600 * 24));
                measureAbs = Math.round(elapsedAbs / (3600 * 24));
                unit = 'day';
            }

            if (measureAbs > 1) {
                unit += 's';
            }

            let prefix = null;
            let suffix = null;
            if (measure < 0) {
                prefix = 'in';
            } else if (measure > 0) {
                suffix = 'ago';
            }

            return (prefix ? prefix + ' ' : '') + measureAbs + ' ' + unit + (suffix ? ' ' + suffix : '');
        } else {
            // otherwise show the actual date, with or without the year.
            if (now.getFullYear() === date.getFullYear()) {
                return shortMonths[date.getMonth()] + ' ' + date.getDate();
            } else {
                return shortMonths[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
            }
        }
    }


    return Object.freeze({niceElapsedTime, shortMonths, shortDays});
});