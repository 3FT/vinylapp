(function() {

    angular.module('vinylApp').controller('reviewsCtrl', ['authentication', reviewsCtrl]);

    function reviewsCtrl(authentication) {

        var rvm = this;

        rvm.isLoggedIn = authentication.isLoggedIn();

        rvm.addReview = function(product){
            rvm.review.author = authentication.currentUser()._id;
            rvm.review.createdOn = Date.now();
            product.reviews.push(rvm.review);
            rvm.review = null;
        };

    }

}());