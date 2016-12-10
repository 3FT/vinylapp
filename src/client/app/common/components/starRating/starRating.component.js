(function() {
    'use strict';

    angular.module('vinylApp').component('starRating', {
        templateUrl: '/app/common/components/starRating/starRating.template.html',
        controller: 'StarRatingController',
        controllerAs: 'vm',
        bindings: {
            ratingValue: '=',
            isReadOnly: '='
        }
    });

}());

