(function() {

    angular.module('vinylApp').controller('usersShowCtrl',
        ['$routeParams','usersData', 'authentication', usersShowCtrl]);

    function usersShowCtrl($routeParams, usersData, authentication) {
        var vm = this;

        vm.user = usersData.getUser($routeParams.id);
        vm.isOwner = authentication.isLoggedIn() && authentication.currentUser()._id === $routeParams.id;
    }
}());