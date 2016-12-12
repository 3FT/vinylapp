(function() {
    'use strict';

    angular.module('vinylApp').directive('timeElapsed', ['time', '$interval', function(time, $interval) {
        return {
            replace: true,
            restrict: 'E',
            template: '<span>{{timeElapsed}}</span>',
            scope: {input: '='},
            link: function(scope, element, attrs) {
                var interval = $interval(function(){
                    scope.timeElapsed = time.getTime(scope.input);
                }, 1000);

                scope.$on('$destroy', function () {
                    $interval.cancel(interval);
                });
            }
        };
    }]);
}());