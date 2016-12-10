(function () {

    angular.module('vinylApp').config(['$locationProvider', function($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);

}());
