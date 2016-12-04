(function () {

    angular.module('vinylApp').controller('UsersCreateCtrl',
        ['$location', 'usersData', UsersCreateCtrl]);

    function UsersCreateCtrl($location, usersData) {
        var vm = this;

     //   vm.user.passwordCopy = "hello";
      //  vm.user.passwordCopy.$setValidity("passwordCOpy", false);


        vm.createUser = function(user) {
            console.log("update");

            if (vm.user.password !== vm.user.passwordCopy) {
                vm.errMessage = "passwords don't match!";

            } else {
                usersData.createUser(user)
                    .then(function (res) {
                        $location.path('/');
                        console.log(user);
                    })
                    .catch(function (err) {
                        console.log(err);
                        vm.errMessage = err.data.message;
                    });
            }
        };
    }
}());


