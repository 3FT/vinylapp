(function(){

    angular.module('vinylApp').controller('ArtistsShowCtrl',
        ['artistsData', 'authentication', '$routeParams', '$location', 'toastrNotification', ArtistsShowCtrl]);

    function ArtistsShowCtrl (artistsData, authentication, $routeParams, $location, toastrNotification) {
        var vm = this;

        artistsData.getArtist($routeParams.id)
            .$promise
            .then(function(artist){
                console.log(artist);
                vm.artist = artist;
                vm.isOwner = authentication.currentUser() && authentication.currentUser()._id === artist.addedBy;
                console.log(artist);
            });

        vm.deleteArtist = function(){
            console.log($routeParams.id);
            artistsData.deleteArtist($routeParams.id)
                .$promise
                .then(function(res){
                    toastrNotification.success('artist deleted');
                    $location.path('/artists');
                });
        };
    }

}());
