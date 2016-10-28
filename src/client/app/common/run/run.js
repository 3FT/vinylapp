(function () {

     angular.module('vinylApp').run(function($rootScope, $location, authentication){

         $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
             if ($location.path() === '/profile' && !authentication.isLoggedIn()) {
                 $location.path('/');
             }
         });

     });

}());