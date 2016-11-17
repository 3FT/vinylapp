(function () {

    angular.module('vinylApp').factory('time', time);

    function time () {

        var getTime = function (dateAdded) {

            var time = Date.now() - dateAdded;

            var timeInSeconds = time / 1000;

            if (timeInSeconds < 60) {
                return Math.floor(timeInSeconds) + ' seconds ago';
            } else if (timeInSeconds < (60*60)) {
                    return Math.floor(timeInSeconds / 60) + ' minutes ago';
            } else if (timeInSeconds < (60*60*60)) {
                    return Math.floor(timeInSeconds / (60*60)) + ' hours ago';
            } else if (timeInSeconds < (60*60*60*24)) {
                    return Math.floor(timeInSeconds / (60*60*60)) + ' days ago';
            }
        };

        return {
            getTime : getTime
        };
    }

}());