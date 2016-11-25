(function() {

    angular.module('vinylApp').directive('dashboard', dashboard);

    function dashboard() {
        return {
            restrict: 'E',
            controller: 'DashboardCtrl as dbdvm',
            templateUrl: '/app/home/directives/dashboard.template.html'
        };
    }

})();