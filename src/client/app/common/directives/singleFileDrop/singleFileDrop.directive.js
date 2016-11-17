(function () {

    angular.module('vinylApp').directive('singleFileDrop', function(){

         return {
             replace: true,
             restrict: 'E',
             templateUrl: '/app/common/directives/singleFileDrop/singleFileDrop.template.html',
             scope: {
                 file : '=',
                 caption: '@'
             }

         };

     });

}());