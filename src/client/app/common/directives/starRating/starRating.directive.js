(function() {

     angular.module('vinylApp').directive('starRating', function(){

         return {
             restrict:'E',
             templateUrl:'/app/common/directives/starRating/starRating.template.html',
             controller: 'StarRatingCtrl as strvm',
             scope: {
                 ratingValue: '=ngModel',
                 isReadOnly: '=?'
             }
         };

     });

}());