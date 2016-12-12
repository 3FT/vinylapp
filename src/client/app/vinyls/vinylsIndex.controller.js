(function () {

    angular.module('vinylApp').controller('vinylsIndexCtrl', ['vinylsData', vinylsIndexCtrl]);

     function vinylsIndexCtrl (vinylsData) {
         var vm = this;

         vm.vinyls = vinylsData.getAllVinyls();
     }

}());

