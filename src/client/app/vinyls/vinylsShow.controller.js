(function() {

    angular.module('vinylApp').controller('vinylsShowCtrl', ['vinylsData',
        '$routeParams', '$location', 'authentication','toastrNotification', vinylsShowCtrl]);

    function vinylsShowCtrl (vinylsData, $routeParams, $location, authentication, toastrNotification) {
       var vm = this;

        vinylsData.getVinyl($routeParams.id)
            .$promise
            .then(function(vinyl){
                console.log(vinyl);
                vm.vinyl = vinyl;
                vm.isOwner = authentication.currentUser() && authentication.currentUser()._id === vinyl.addedBy;
            });

        vm.deleteVinyl = function(){
            vinylsData.deleteVinyl($routeParams.id)
                .$promise
                .then(function(res){
                    $location.path('/vinyls');
                });
        };

        function updateVinylRating(vinyl) {
            var sum = 0;

            for (var i = 0; i < vinyl.reviews.length; i++) {
                sum += vinyl.reviews[i].stars;
            }

            var avg = sum / vinyl.reviews.length;
            vinyl.averageRating = avg;
        }

        vm.updateVinylReview = function(reviews) {
            vm.vinyl.review = reviews;
            updateVinylRating(vm.vinyl);
            console.log(vm.vinyl);
            vinylsData.updateVinylReview(vm.vinyl)
                .$promise
                    .then(function(){
                        toastrNotification.success('review added');
                    });
            console.log(reviews);
            console.log("foo");
        };
    }

}());


