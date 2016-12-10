(function() {
'use strict';

    angular.module('vinylApp').component('uploadBox', {
        templateUrl: '/app/common/components/uploadBox/uploadBox.template.html',
        controller: ['$scope', UploadBoxController],
        controllerAs: 'vm',
        bindings: {
            images: '='
        }
    });

    function UploadBoxController($scope) {
        var vm = this;

        $scope.$watch('vm.uploads', function(newValue, oldValue) {
            if (newValue) {
                for (var i = 0; i < newValue.length; i++) {
                    vm.images.push(newValue[i]);
                }
            }
        });

        vm.removeImage = function(images, index) {
            images.splice(index, 1);
        };
    }

}());