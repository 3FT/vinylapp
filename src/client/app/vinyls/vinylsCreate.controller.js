(function() {

    angular.module('vinylApp').controller('vinylsCreateCtrl',
        ['vinylsData', 'artistsData', '$location', 'toastrNotification', vinylsCtrl]);

    function vinylsCtrl (vinylsData, artistsData, $location, toastrNotification) {
        var vm = this;

        vm.vinyl = {
            tracklist: []
        };

        artistsData.getArtistNames()
             .then(function(artistNames) {
                 vm.artistNames = artistNames;
             });

        vm.createVinyl = function(vinyl) {
            vinylsData.createVinyl(vinyl)
                .$promise
                .then(function(res) {
                    vinyl._id= res._id;
                    vinylsData.updateVinylFile(vinyl)
                        .then(function(res) {
                            toastrNotification.success('vinyl added');
                            $location.path('/vinyls');
                        });
                });
        };
    }
}());




