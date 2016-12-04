(function() {
'use strict';

     angular.module('ngGravatar', ['angular-md5']);
     angular.module('ngGravatar').directive('gravatar', function() {
         return {
             replace: true,
             restrict: 'E',
             template: '<img ng-src={{gravatarUrl}}>',
             scope: {email: '='},
             controller: ['$scope', 'md5', function($scope, md5){
                 var imageSize = 200;
                 var url = 'http://www.gravatar.com/avatar/';
               //  $scope.gravatarUrl = url + md5.createHash($scope.email || '') + '?size=' + imageSize.toString();
                 $scope.$watch('email', function(newValue, oldValue) {
                     $scope.gravatarUrl = url + md5.createHash(newValue || '') + '?size=' + imageSize.toString();
                 });
             }]
         };
     });

}());


