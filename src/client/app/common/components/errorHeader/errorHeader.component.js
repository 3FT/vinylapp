(function() {
'use strict';

     angular.module('vinylApp').component('errorHeader', {
            templateUrl: '/app/common/components/errorHeader/errorHeader.template.html',
            bindings: {
                 message: '='
            },
            controllerAs: 'vm'
     });

}());