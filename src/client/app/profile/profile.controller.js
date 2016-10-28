(function () {

    angular.module('vinylApp').controller('profileCtrl', profileCtrl);

     function profileCtrl(profileData) {
         var vm = this;

         vm.user = {};

         profileData.getProfile()
             .success(function(data) {
                 vm.user = data;
             })
             .error(function (e) {
                 console.log(e);
             });
     }


     console.log("hello");
}());