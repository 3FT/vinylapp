(function() {

    angular.module('vinylApp').filter('twoDigits', function() {
        // In the return function, we must pass in a single parameter which will be the data we will work on.
        // We have the ability to support multiple other parameters that can be passed into the filter optionally
        return function(input, optional1, optional2) {
            return ('0' + input).slice(-2);
        };
    });
}());