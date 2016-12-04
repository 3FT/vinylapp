(function() {

    angular.module('vinylApp').controller('UsersEditCtrl', ['$routeParams',
        'usersData', '$location', UsersEditCtrl]);

    function UsersEditCtrl($routeParams, usersData, $location) {
        var vm = this;

        vm.user = usersData.getUser($routeParams.id);
        vm.updateUser = function(user) {
            console.log("update");

            if (vm.user.password !== vm.user.passwordCopy) {
                vm.errMessage = "passwords don't match!";

            } else {
                usersData.updateUser(user)
                    //.$promise
                    .then(function(res) {
                        //authentication.saveToken(res.token);
                        $location.path('/users/' + $routeParams.id);
                        console.log(user);
                    })
                    .catch(function(err){
                        console.log(err);
                    });
            }
        };
    }
}());