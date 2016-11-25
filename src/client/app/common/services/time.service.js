(function () {

    angular.module('vinylApp').factory('time', time);

    function time () {

        var getTime = function (dateAdded) {

            var time = Date.now() - dateAdded;

            var timeInSeconds = time / 1000;
            var minute = 60;
            var hour = 60 * minute;
            var day = 24 * hour;
            var week = 7 * day;
            var month = 30 * day;
            var year = 12 * month;

            if (timeInSeconds < minute) {
                return Math.floor(timeInSeconds) + ' seconds ago';
            } else if (timeInSeconds < hour) {
                return Math.floor(timeInSeconds / minute) + ' minutes ago';
            } else if (timeInSeconds < (day)) {
                return Math.floor(timeInSeconds / hour) + ' hours ago';
            } else if (timeInSeconds < (week)) {
                return Math.floor(timeInSeconds / day) + ' days ago';
            } else if (timeInSeconds < (month)) {
                return Math.floor(timeInSeconds / week) + ' weeks ago';
            } else if (timeInSeconds < (year)) {
                return Math.floor(timeInSeconds / month) + ' months ago';
            } else {
                return Math.floor(timeInSeconds / year) + ' years ago';
            }
        };

        return {
            getTime : getTime
        };
    }

}());