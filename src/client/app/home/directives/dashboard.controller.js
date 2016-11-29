(function() {

    angular.module('vinylApp').controller('DashboardCtrl', ['vinylsData', 'artistsData', 'authentication', DashboardCtrl]);

    function DashboardCtrl(vinylsData, artistsData, authentication) {
        var dbdvm= this;

        vinylsData.getAllVinyls()
            .$promise
            .then(function(vinyls) {
                console.log(getItemsCount(vinyls, authentication.currentUser().name));
                dbdvm.myVinylCount = getItemsCount(vinyls, authentication.currentUser().name);
            });

        artistsData.getAllArtists()
            .$promise
            .then(function(artists) {
                console.log(getItemsCount(artists, authentication.currentUser().name));
                dbdvm.myArtistCount = getItemsCount(artists, authentication.currentUser().name);
            });

        function getItemsCount(things, owner) {
            var count = 0;
            angular.forEach(things, function(thing){
                count += thing.addedBy === owner ? 1 : 0;
            });
            return count;
        }
    }
})();
