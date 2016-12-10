(function() {
    'use strict';

    angular.module('vinylApp').component('reviews', {
        templateUrl: '/app/common/components/reviews/reviews.template.html',
        controller: ['authentication', ReviewsController],
        controllerAs: 'vm',
        bindings: {
            reviews: '=',
            updateReview: '&'
        }
    });

    function ReviewsController(authentication) {
        var vm = this;

        vm.isLoggedIn = authentication.isLoggedIn();

        vm.addReview = function(review){
            review.author = authentication.currentUser()._id;
            review.createdOn = Date.now();
            vm.reviews.push(vm.review);
            vm.review = null;
        };
    }

}());

