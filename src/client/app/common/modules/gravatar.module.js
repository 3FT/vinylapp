(function () {

     angular.module('ngGravatar', ['angular-md5']);
     angular.module('ngGravatar').directive('gravatar', function(Gravatar){
         return {
             replace: true,
             restrict: 'E',
             template: '<img ng-src={{gravatarUrl}}>',
             scope: {email: '='},
             controller: function($scope){
                 /*jshint -W064 */
                 $scope.gravatarUrl = Gravatar($scope.email);
                 /*jshint +W064 */
             }
         };
     });

     angular.module('ngGravatar').provider('Gravatar', function(){
         var imageSize = 200;
         var url = 'http://www.gravatar.com/avatar/';

         // configuration
         this.setSize = function(value) {
             imageSize = value;
         };

         // returns service
         this.$get = function(md5) {
             return function(email) {
                 return url + md5.createHash(email) + '?size=' + imageSize.toString();
             };
         };
     });

}());