(function () {

     angular.module('vinylApp').config(function($routeProvider){

         $routeProvider
             .when('/artists', {
                 templateUrl: '/app/artists/views/index.html',
                 controller: 'artistsIndexCtrl',
                 controllerAs: 'vm'
             })
             .when('/artists/new', {
                 templateUrl: '/app/artists/views/new.html',
                 controller: 'artistsCreateCtrl',
                 controllerAs: 'vm'
             })
             .when('/artists/:id/edit', {
                 templateUrl: '/app/artists/views/edit.html',
                 controller: 'ArtistsEditCtrl',
                 controllerAs: 'vm'
             })
             .when('/artists/:id', {
                 templateUrl: '/app/artists/views/show.html',
                 controller: 'artistsShowCtrl',
                 controllerAs: 'vm'
             });
     });

}());