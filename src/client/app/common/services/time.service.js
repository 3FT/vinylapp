(function() {
'use strict';

    angular.module('vinylApp').factory('time', time);

    function time() {
        var getTime = function (dateAdded) {

            var time = Date.now() - dateAdded;

            var timeInSeconds = time / 1000;

            var second = 1;
            var minute = 60 * second;
            var hour = 60 * minute;
            var day = 24 * hour;
            var week = 7 * day;
            var month = 30 * day;
            var year = 12 * month;

            var output;

            if (timeInSeconds < minute) {
                output = convertTime(timeInSeconds, second);
                return fullOutput(output, 'second');
            } else if (timeInSeconds < hour) {
                output = convertTime(timeInSeconds, minute);
                return fullOutput(output, 'minute');
            } else if (timeInSeconds < (day)) {
                output = convertTime(timeInSeconds, hour);
                return fullOutput(output, 'hour');
            } else if (timeInSeconds < (week)) {
                output = convertTime(timeInSeconds, day);
                return fullOutput(output, 'day');
            } else if (timeInSeconds < (month)) {
                output = convertTime(timeInSeconds, week);
                return fullOutput(output, 'week');
            } else if (timeInSeconds < (year)) {
                output = convertTime(timeInSeconds, month);
                return fullOutput(output, 'month');
            } else {
                output = convertTime(timeInSeconds, year);
                return fullOutput(output, 'year');
            }
        };

        function convertTime(time, unit) {
            return Math.floor(time / unit);
        }

        function getPlurial(output) {
            return (output !== 1 ? 's':'');
        }

        function fullOutput(output, unitString) {
            return output + ' ' + unitString + getPlurial(output) + ' ago';
        }
        return {
            getTime : getTime
        };
    }
}());