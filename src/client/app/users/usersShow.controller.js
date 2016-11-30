(function() {

    angular.module('vinylApp').controller('usersShowCtrl', usersShowCtrl);

    function usersShowCtrl($routeParams, usersData, authentication) {
        var vm = this;

        vm.user = usersData.getUser($routeParams.id);
        vm.isOwner = authentication.currentUser()._id === $routeParams.id;
    }
}());