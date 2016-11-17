(function () {

    angular.module('vinylApp').controller('loginCtrl', loginCtrl);

     function loginCtrl($location, authentication) {
         var vm = this;

         vm.credentials = {
             email : '',
             password : ''
         };


         vm.onSubmit = function () {

             authentication
                 .login(vm.credentials)
                 .error(function(err){
                     vm.errMessage = err.message;
                 })
                 .then(function(){
                     $location.path('/');
                 });
         };
     }

}());