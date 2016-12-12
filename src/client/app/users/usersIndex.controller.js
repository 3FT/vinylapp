(function() {
'use strict';

    angular.module('vinylApp').controller('usersIndexCtrl', ['usersData', usersIndexCtrl]);

    function usersIndexCtrl(usersData) {
        var vm = this;
        vm.users = usersData.getAllUsers();
    }

}());