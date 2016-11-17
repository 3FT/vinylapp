(function () {

    angular.module('vinylApp').controller('usersIndexCtrl', usersIndexCtrl);

    function usersIndexCtrl (usersData, time, $interval, $scope) {

        var vm = this;
        vm.users = usersData.getAllUsers();

        vm.getDateJoined = function(dateJoined) {
            return time.getTime(dateJoined);
        };

        var interval = $interval(function(){
            vm.getDateJoined();
        }, 1000);

        $scope.$on('$destroy', function () {
            $interval.cancel(interval);
        });
    }

}());