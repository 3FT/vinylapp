(function() {

    angular.module('vinylApp').controller('StarRatingController', ['$scope', StarRatingController]);

    function StarRatingController($scope) {
        var vm = this;

        vm.max = 5;
        vm.getNumber = function(num) {
            return new Array(num);
        };

        vm.toggle = function(index) {
            if (!vm.isReadOnly) {
                vm.ratingValue = index + 1;
                vm.percentage = getWidthPercentage(vm.ratingValue, vm.max);
            }
        };

        $scope.$watch('vm.ratingValue', function(newValue, oldValue){
            vm.percentage = getWidthPercentage(vm.ratingValue, vm.max);
        });

        function getWidthPercentage(ratingValue, maxValue) {
            var width = (ratingValue / maxValue) || 0;
            return width * 100 + '%';
        }
    }

}());