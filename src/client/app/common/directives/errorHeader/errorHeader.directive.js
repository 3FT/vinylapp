(function () {

     angular.module('vinylApp').directive('errorHeader', function(){

         return {
             replace: true,
             restrict: 'E',
             templateUrl: '/app/common/directives/errorHeader/errorHeader.template.html',
             scope: {
                 message : '='
             }
         };

     });

}());