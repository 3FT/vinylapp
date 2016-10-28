(function () {

    angular.module('vinylApp').controller('vinylsEditCtrl', vinylsEditCtrl);

    function vinylsEditCtrl(vinylsData, $routeParams, $location) {
        var vm = this;
        var initialImages = {};

        vinylsData.getVinyl($routeParams.id)
            .$promise
            .then(function(res){
                vm.vinyl = res;
                Object.assign(initialImages, vm.vinyl.images);
            });


        vm.updateVinyl = function(vinyl){
            vinylsData.updateVinyl(vinyl)
                .$promise
                .then(function(res){
                    if (!angular.equals(initialImages, vinyl.images)){
                        vinylsData.updateVinylFile(vinyl)
                            .then(function(res){
                                $location.path('/vinyls/' + vinyl._id);
                            })
                    } else {
                        $location.path('/vinyls/' + vinyl._id);
                    }
                });
        };

    }

}());