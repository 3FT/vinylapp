(function () {

    angular.module('vinylApp').controller('vinylsCreateCtrl', vinylsCtrl);

    function vinylsCtrl (vinylsData, $location) {
        var vm = this;

        vm.vinyl = {};
        vm.vinyl.images = {frontCover: "", backCover: ""};

        // inital images
        var initialImages = {};
        Object.assign(initialImages, vm.vinyl.images);
        
        vm.createVinyl = function(vinyl) {

            vinylsData.createVinyl(vinyl)
                .$promise
                .then(function(res) {
                    // if images changed, save them
                    if (!angular.equals(initialImages, vinyl.images)){
                        vinyl._id= res._id;
                        vinylsData.updateVinylFile(vinyl)
                            .then(function(res){
                                $location.path('/vinyls');
                            })
                    } else {
                        $location.path('/vinyls');
                    }
                })

        };

    }

}());




