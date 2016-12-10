(function() {

    angular.module('vinylApp').controller('ArtistsEditCtrl',
        ['artistsData', '$routeParams', '$location', 'toastrNotification', ArtistsEditCtrl]);

    function ArtistsEditCtrl (artistsData, $routeParams, $location, toastrNotification) {
        var vm = this;
        vm.styles = ['rock','blues','funk'];
        vm.artist = artistsData.getArtist($routeParams.id);

        vm.updateArtist = function(artist){
            artistsData.updateArtist(artist)
                .$promise
                .then(function(res) {
                    artistsData.updateArtistFiles(artist)
                        .then(function(res) {
                            toastrNotification.success('artist updated');
                            $location.path('/artists/' + artist._id);
                        });
                })
                .catch(function(res) {
                    console.log(res.data.message);
                })
            ;
        };

        vm.removeImage = function(images, index) {
            images.splice(index, 1);
        };
    }
}());


