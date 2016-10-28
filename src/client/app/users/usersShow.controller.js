(function () {

    angular.module('vinylApp').controller('usersShowCtrl', usersShowCtrl);

    function usersShowCtrl($routeParams, usersData) {
        var vm = this;

        vm.user = usersData.getUser($routeParams.id)

/*        usersData.getUser($routeParams.id).then(function(data){
           console.log(data) ;
        });*/
    }

}());