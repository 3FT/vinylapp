(function() {

    angular.module('vinylApp').controller('ArtistsIndexCtrl',
        ['artistsData', 'time', ArtistsIndexCtrl]);


    function ArtistsIndexCtrl (artistsData, time) {
        var vm = this;
        vm.artists = artistsData.getAllArtists();

        vm.getTime = function (dateAdded) {
            return time.getTime(dateAdded);
        };
    }
}());
