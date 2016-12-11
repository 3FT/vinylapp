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
        var vm = this;

        vm.isLoggedIn = function(){
            return authentication.isLoggedIn();
        };

        vm.currentUser = function(){
            return authentication.currentUser();
        };

        vm.logOut = function (){
            authentication.logout();
            $location.path('/');
        };
    }

}());

