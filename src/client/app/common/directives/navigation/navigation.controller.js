(function () {

    angular.module('vinylApp').controller('navigationCtrl', navigationCtrl);

     function navigationCtrl($location, authentication) {

         var navvm = this;

         navvm.isLoggedIn = function(){
             return authentication.isLoggedIn();
         };

         navvm.currentUser = function(){
             return authentication.currentUser();
         };

         navvm.logOut = function (){
             authentication.logout();
             $location.path('/');
         };

     }

}());