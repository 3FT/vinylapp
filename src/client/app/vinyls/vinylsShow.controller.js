(function () {

    angular.module('vinylApp').controller('vinylsShowCtrl', vinylsShowCtrl);

    function vinylsShowCtrl (vinylsData, $routeParams, $location, authentication) {
       var vm = this;

        vinylsData.getVinyl($routeParams.id)
            .$promise
            .then(function(vinyl){
                vm.vinyl = vinyl;
                vm.isOwner = authentication.currentUser() && authentication.currentUser().name === vinyl.addedBy;
            });

        vm.deleteVinyl = function(){
            vinylsData.deleteVinyl($routeParams.id)
                .$promise
                .then(function(res){
                    $location.path('/vinyls');
                });
        };

        vm.updateVinylReview = function(vinyl) {

            vinylsData.updateVinylReview(vinyl);

        };

    }

}());


