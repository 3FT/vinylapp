(function () {

    angular.module('vinylApp').controller('registerCtrl', registerCtrl);

     function registerCtrl($location, authentication) {
         var vm = this;

         vm.credentials = {
             name: "",
             email: "",
             password: ""
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