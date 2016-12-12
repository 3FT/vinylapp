(function() {

    angular.module('vinylApp').controller('UsersEditCtrl', ['$routeParams',
        'usersData', '$location', 'toastrNotification', UsersEditCtrl]);

    function UsersEditCtrl($routeParams, usersData, $location, toastrNotification) {
        var vm = this;

        vm.user = usersData.getUser($routeParams.id);
        vm.updateUser = function(user) {
            usersData.updateUser(user)
                .then(function(res) {
                    toastrNotification.success('profile updated');
                    $location.path('/users/' + $routeParams.id);
                    console.log(user);
                })
                .catch(function(err){
                    console.log(err);
                });
        };
    }
}());