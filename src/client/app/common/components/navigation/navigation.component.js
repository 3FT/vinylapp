(function() {
'use strict';

    angular.module('vinylApp').component('navigation', {
        templateUrl: '/app/common/components/navigation/navigation.template.html',
        controller: ['$location', 'authentication', NavigationController],
        controllerAs: 'vm',
        bindings: {
            images: '='
        }

    });

    function NavigationController($location, authentication) {
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

