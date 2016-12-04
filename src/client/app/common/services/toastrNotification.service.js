(function() {
'use strict'

    angular.module('vinylApp').factory('toastrNotification', toastrNotification);

    function toastrNotification() {
        return {
            success: function (text) {
                toastr.success(text,"Success");
            },
            error: function (text) {
                toastr.error(text, "Error");
            }
        };
    }
}());