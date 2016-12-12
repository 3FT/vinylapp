(function () {

    angular.module('vinylApp').controller('UsersCreateCtrl',
        ['$location', 'usersData', UsersCreateCtrl]);

    function UsersCreateCtrl($location, usersData) {
        var vm = this;

        vm.createUser = function(user) {

            usersData.createUser(user)
                .then(function (res) {
                    $location.path('/');
                    console.log(user);
                })
                .catch(function (err) {
                    console.log(err);
                    vm.errMessage = err.data.message;
                });
        };
    }
}());


