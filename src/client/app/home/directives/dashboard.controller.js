(function() {

    angular.module('vinylApp').controller('DashboardCtrl',
        ['vinylsData', 'artistsData', 'authentication', DashboardCtrl]);

    function DashboardCtrl(vinylsData, artistsData, authentication) {
        var dbdvm= this;

        vinylsData.getAllVinyls()
            .$promise
            .then(function(vinyls) {
                dbdvm.myVinylCount = getItemsCount(vinyls, authentication.currentUser()._id);
            });

        artistsData.getAllArtists()
            .$promise
            .then(function(artists) {
                dbdvm.myArtistCount = getItemsCount(artists, authentication.currentUser()._id);
            });

        function getItemsCount(things, owner) {
            var count = 0;
            angular.forEach(things, function(thing) {
                count += thing.addedBy === owner ? 1 : 0;
            });
            return count;
        }
    }
})();
