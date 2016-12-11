(function () {

    angular.module('vinylApp').controller('loginCtrl', ['$location',
        'authentication', loginCtrl]);

     function loginCtrl($location, authentication) {
         var vm = this;

         vm.credentials = {
             email : '',
             password : ''
         };


         vm.onSubmit = function () {
             authentication
                 .login(vm.credentials)
                 .then(function(){
                     $location.path('/');
                 })
                 .catch(function(err) {
                     vm.errMessage = err.data.message;
                 })
             ;
         };
     }

}());