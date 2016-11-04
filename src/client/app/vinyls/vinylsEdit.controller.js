(function () {

    angular.module('vinylApp').controller('vinylsEditCtrl', vinylsEditCtrl);

    function vinylsEditCtrl(vinylsData, $routeParams, $location) {
        var vm = this;

        vm.vinyl = vinylsData.getVinyl($routeParams.id)

        vm.updateVinyl = function(vinyl){
            vinylsData.updateVinyl(vinyl)
                .$promise
                .then(function(res){
                    vinylsData.updateVinylFile(vinyl)
                        .then(function(res){
                            $location.path('/vinyls/' + vinyl._id);
                        });
                });

        };

    }

}());