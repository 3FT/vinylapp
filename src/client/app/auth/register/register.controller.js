(function() {
'use strict';

    angular.module('vinylApp').controller('registerCtrl',
        ['$location', 'authentication', registerCtrl]);

     function registerCtrl($location, authentication) {
         var vm = this;

         vm.credentials = {
             _id: '',
             email: '',
             password: ''
         };

         vm.onSubmit = function () {
             authentication
                 .register(vm.credentials)
                 .then(function () {
                     $location.path('/');
                 })
                 .catch(function (err) {
                     vm.errMessage = err.data.message;
                 });
         };
     }

}());