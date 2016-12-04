(function() {

    angular.module('vinylApp').controller('ArtistsCreateCtrl',
        ['artistsData', '$location', ArtistsCreateCtrl]);

    function ArtistsCreateCtrl (artistsData, $location) {
        var vm = this;
        vm.styles = ['rock','blues','funk'];

        vm.createArtist = function(artist) {
            artistsData.createArtist(artist)
                .$promise
                .then(function(){
                    $location.path('/artists');
                });
        };
    }
}());


