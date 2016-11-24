(function () {

    angular.module('vinylApp').controller('ArtistsEditCtrl', ArtistsEditCtrl);

    function ArtistsEditCtrl (artistsData, $routeParams, $location) {
        var vm = this;
        vm.styles = ['rock','blues','funk'];
        vm.artist = artistsData.getArtist($routeParams.id);

        vm.updateArtist = function(artist){
            artistsData.updateArtist(artist)
                .$promise
                .then(function(res) {
                    $location.path('/artists/' + artist._id);
                })
                .catch(function(res) {
                    console.log(res.data.message);
                })
            ;
        };
    }

}());


