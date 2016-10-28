(function () {

    angular.module('vinylApp').controller('reviewsCtrl', reviewsCtrl);

    function reviewsCtrl(authentication) {

        var rvm = this;
        rvm.review = null;
        rvm.isLoggedIn = authentication.isLoggedIn();


        rvm.addReview = function(product){

            rvm.review.author = authentication.currentUser().name;
            rvm.review.createdOn = Date.now();
            product.reviews.push(rvm.review);
            rvm.review = null;

        };

    }

}());