(function () {

    angular.module('vinylApp').controller('homeCtrl',
        ['authentication', homeCtrl]);

    function homeCtrl(authentication) {

        var vm = this;

        vm.isLoggedIn = function(){
            return authentication.isLoggedIn();
        };

        vm.currentUser = function(){
            return authentication.currentUser();
        };

     }

}());