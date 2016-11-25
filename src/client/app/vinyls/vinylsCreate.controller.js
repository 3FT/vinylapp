(function () {

    angular.module('vinylApp').controller('vinylsCreateCtrl', vinylsCtrl);

    function vinylsCtrl (vinylsData, artistsData, $location) {
        var vm = this;

        vm.artists = artistsData.getAllArtists();

        vm.createVinyl = function(vinyl) {

            vinylsData.createVinyl(vinyl)
                .$promise
                .then(function(res) {
                    vinyl._id= res._id;
                    vinylsData.updateVinylFile(vinyl)
                        .then(function(res) {
                            $location.path('/vinyls');
                        });
                });
        };

    }

}());




