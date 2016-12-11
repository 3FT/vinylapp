(function() {
    'use strict';

    angular.module('vinylApp').component('reviews', {
        templateUrl: '/app/common/components/reviews/reviews.template.html',
        controller: ['authentication', 'toastrNotification', ReviewsController],
        controllerAs: 'vm',
        bindings: {
            reviews: '=',
            updateMethod: '&'
        }
    });

    function ReviewsController(authentication, toastrNotification) {
        var vm = this;

        vm.currentUser = authentication.currentUser()._id;
        vm.isLoggedIn = authentication.isLoggedIn();

        vm.addReview = function(review){
            review.author = authentication.currentUser()._id;
            review.createdOn = Date.now();
            vm.reviews.push(vm.review);
            vm.clearReviewForm();
            vm.updateMethod({review: vm.reviews});
            toastrNotification.success('review added');

        };

        vm.editReview = function(id) {
            vm.editionIndex = id;
            vm.review = Object.create(vm.reviews[id]);
        };

        vm.deleteReview = function(id) {
            vm.reviews.splice(id, 1);
            vm.updateMethod({review: vm.reviews});
            toastrNotification.success('review deleted');
        };

        vm.clearReviewForm = function() {
            vm.review = null;
            vm.editionIndex = null;
        };

        vm.updateReview = function(review, id) {
            review.createdOn = Date.now();
            vm.reviews[id] = review;
            vm.clearReviewForm();
            vm.updateMethod({review: vm.reviews});
            toastrNotification.success('review updated');
        };
    }

}());

