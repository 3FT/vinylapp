(function() {

    angular.module('vinylApp').controller('artistsShowCtrl', artistsShowCtrl);

    function artistsShowCtrl (artistsData, authentication, $routeParams, $location) {
        var vm = this;

        artistsData.getArtist($routeParams.id)
            .$promise
            .then(function(artist){
                vm.artist = artist;
                vm.isOwner = authentication.currentUser() && authentication.currentUser().name === artist.addedBy;
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
