angular.module('vinylApp').directive('reviews', function(){

    return {
        restrict:'E',
        templateUrl:'/app/common/directives/reviews/reviews.template.html',
        controller: 'reviewsCtrl as rvm',
        scope: {
            product : '=',
            updateMethod : '='
        }
    };

});