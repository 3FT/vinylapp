(function() {
'use strict';

    angular.module('vinylApp').directive('modalImage', modalImage);

    function modalImage () {
        return {
            restrict: 'E',
            template: '<a ng-click="open()">open modal lev</a>',
            controller: ['$scope', '$uibModal', ModalImageCtrl],
            scope: {
                url: '@'
            }
        };
    }

    function ModalImageCtrl($scope, $uibModal) {

        var modOp = {
            template : '<img src="{{url}}">',
            scope: $scope
        };

        $scope.open = function() {
            $uibModal.open(modOp);
        };
    }
})();