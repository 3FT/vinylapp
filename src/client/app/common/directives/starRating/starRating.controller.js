(function() {

    angular.module('vinylApp').controller('StarRatingCtrl', ['$scope', StarRatingCtrl]);

    function StarRatingCtrl($scope) {
        $scope.max = 5;
        $scope.getNumber = function(num) {
            return new Array(num);
        };

        $scope.toggle = function(index) {
            if (!$scope.isReadOnly) {
                $scope.ratingValue = index + 1;
                $scope.percentage = getWidthPercentage($scope.ratingValue, $scope.max);
            }
        };

        $scope.$watch('ratingValue', function(newValue, oldValue){
            $scope.percentage = getWidthPercentage($scope.ratingValue, $scope.max);
        });

        function getWidthPercentage(ratingValue, maxValue) {
            var width = (ratingValue / maxValue) || 0;
            return width * 100 + '%';
        }
    }
}());