(function () {

    angular.module('vinylApp').directive('navigation', navigation);

    function navigation () {
        return {
            restrict: 'EA',
            templateUrl: '/app/common/directives/navigation/navigation.template.html',
            controller: 'navigationCtrl as navvm'
        };
    }

})();