(function() {

    angular.module('vinylApp').controller('ArtistsIndexCtrl', ['artistsData', ArtistsIndexCtrl]);

    function ArtistsIndexCtrl (artistsData, time) {
        var vm = this;
        vm.artists = artistsData.getAllArtists();
    }
}());
