(function(){

    angular.module('vinylApp').controller('ArtistsShowCtrl',
        ['artistsData', 'authentication', '$routeParams', '$location', ArtistsShowCtrl]);

    function ArtistsShowCtrl (artistsData, authentication, $routeParams, $location) {
        var vm = this;

        artistsData.getArtist($routeParams.id)
            .$promise
            .then(function(artist){
                vm.artist = artist;
                vm.isOwner = authentication.currentUser() && authentication.currentUser()._id === artist.addedBy;
            });

        vm.deleteArtist = function(){
            console.log($routeParams.id);
            artistsData.deleteArtist($routeParams.id)
                .$promise
                .then(function(res){
                    $location.path('/artists');
                });
        };
    }
}());
