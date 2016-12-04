(function () {

    angular.module('vinylApp').controller('vinylsEditCtrl',
        ['vinylsData', 'artistsData', '$routeParams', '$location', 'toastrNotification', vinylsEditCtrl]);

    function vinylsEditCtrl(vinylsData, artistsData, $routeParams, $location, toastrNotification) {
        var vm = this;

        // vm.vinyl = vinylsData.getVinyl($routeParams.id);

        vinylsData.getVinyl($routeParams.id)
            .$promise
            .then(function(data) {
                vm.vinyl = data;
              //  debugger;
            });

        vm.artists = artistsData.getAllArtists();

        vm.updateVinyl = function(vinyl){
            vinylsData.updateVinyl(vinyl)
                .$promise
                .then(function(res){
                    vinylsData.updateVinylFile(vinyl)
                        .then(function(res){
                            toastrNotification.success('vinyl updated');
                            $location.path('/vinyls/' + vinyl._id);
                        });
                });

        };

    }

}());