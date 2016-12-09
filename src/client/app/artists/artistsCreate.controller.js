(function() {

    angular.module('vinylApp').controller('ArtistsCreateCtrl',
        ['artistsData', '$location', 'toastrNotification', '$scope', ArtistsCreateCtrl]);

    function ArtistsCreateCtrl (artistsData, $location, toastrNotification, $scope) {
        var vm = this;
        vm.styles = ['rock','blues','funk'];
        vm.artist = {
            images: []
        };


        vm.createArtist = function(artist) {
            console.log(artist);
            artistsData.createArtist(artist)
                .$promise
                .then(function(res){
                    artist._id = res._id;
                    artistsData.updateArtistFiles(artist)
                    .then(function(res) {
                        toastrNotification.success('artist added');
                        $location.path('/artists');
                    });
                });
        };

        vm.removeImage = function(images, index) {
            images.splice(index, 1);
        };

        $scope.$watch('vm.uploads', function(newValue, oldValue) {
         if (newValue) {
            for (var i = 0; i < newValue.length; i++) {
                vm.artist.images.push(newValue[i]);
                //Do something
            }
         }
        });



    }
}());


