(function () {

    angular.module('vinylApp').controller('artistsIndexCtrl', artistsIndexCtrl);

    function artistsIndexCtrl (artistsData, time) {
        var vm = this;
        vm.artists = artistsData.getAllArtists();

        vm.getTime = function (dateAdded) {
            return time.getTime(dateAdded);
        };
    }

}());
