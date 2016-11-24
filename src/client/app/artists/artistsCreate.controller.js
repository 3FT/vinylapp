(function () {

    angular.module('vinylApp').controller('artistsCreateCtrl', artistsCreateCtrl);

    function artistsCreateCtrl (artistsData, $location) {
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


