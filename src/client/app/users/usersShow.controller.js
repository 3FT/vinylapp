(function () {

    angular.module('vinylApp').controller('usersShowCtrl', usersShowCtrl);

    function usersShowCtrl($routeParams, usersData) {
        var vm = this;

        vm.user = usersData.getUser($routeParams.id);

    }

}());