(function () {

    angular.module('vinylApp').controller('vinylsIndexCtrl', vinylsIndexCtrl);

     function vinylsIndexCtrl (vinylsData, time, $interval, $scope) {
         var vm = this;

         vm.vinyls = vinylsData.getAllVinyls();

         vm.getTime = function (dateAdded) {

             return time.getTime(dateAdded);
         };

         var interval = $interval(function(){
             vm.getTime();
         }, 1000);

         $scope.$on('$destroy', function () {
             $interval.cancel(interval)
         });

     }

}());

