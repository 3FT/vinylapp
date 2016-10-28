(function () {

     angular.module('ngGravatar', ['angular-md5']);
     angular.module('ngGravatar').directive("gravatar", function(Gravatar){
         return {
             replace: true,
             restrict: 'E',
             template: "<img ng-src='{{gravatarUrl}}'>",
             scope: {email: '='},
             controller: function($scope){
                 $scope.gravatarUrl = Gravatar($scope.email);
             }
         }
     });

     angular.module('ngGravatar').provider('Gravatar', function(){
         var imageSize = 200;
         var url = "http://www.gravatar.com/avatar/";

         // configuration
         this.setSize = function(value) {
             imageSize = value;
         };

         // returns service
         this.$get = function(md5) {
             return function(email) {
                 //return url + CryptoJS.MD5(email) + "?size=" + imageSize.toString();
                 return url + md5.createHash(email) + "?size=" + imageSize.toString();
                 //return url + CryptoJS.MD5(email);
             }
         };
     });

}());