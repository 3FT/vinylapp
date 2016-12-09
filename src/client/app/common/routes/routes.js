(function () {

    angular.module('vinylApp').config(['$routeProvider', function($routeProvider){

        $routeProvider
            .when('/', {
                templateUrl: '/app/home/home.view.html',
                controller: 'homeCtrl',
                controllerAs: 'vm'
            })
            .when('/login', {
                templateUrl: '/app/auth/login/login.view.html',
                controller: 'loginCtrl',
                controllerAs: 'vm'
            })
            .when('/profile', {
                templateUrl: '/app/profile/profile.view.html',
                controller: 'profileCtrl',
                controllerAs: 'vm'
            })
            .when('/vinyls', {
                templateUrl: '/app/vinyls/views/index.html',
                controller: 'vinylsIndexCtrl',
                controllerAs: 'vm'
            })
            .when('/vinyls/new', {
                templateUrl: '/app/vinyls/views/new.html',
                controller: 'vinylsCreateCtrl',
                controllerAs: 'vm'
            })
            .when('/vinyls/:id/edit', {
                templateUrl: '/app/vinyls/views/edit.html',
                controller: 'vinylsEditCtrl',
                controllerAs: 'vm'
            })
            .when('/vinyls/:id', {
                templateUrl: '/app/vinyls/views/show.html',
                controller: 'vinylsShowCtrl',
                controllerAs: 'vm'
            })
            .when('/artists', {
                templateUrl: '/app/artists/views/index.html',
                controller: 'ArtistsIndexCtrl',
                controllerAs: 'vm'
            })
            .when('/artists/new', {
                templateUrl: '/app/artists/views/new.html',
                controller: 'ArtistsCreateCtrl',
                controllerAs: 'vm'
            })
            .when('/artists/:id/edit', {
                templateUrl: '/app/artists/views/edit.html',
                controller: 'ArtistsEditCtrl',
                controllerAs: 'vm'
            })
            .when('/artists/:id', {
                templateUrl: '/app/artists/views/show.html',
                controller: 'ArtistsShowCtrl',
                controllerAs: 'vm'
            })
            .when('/users', {
                templateUrl: '/app/users/views/index.html',
                controller: 'usersIndexCtrl',
                controllerAs: 'vm'
            })
            .when('/users/new', {
                templateUrl: '/app/users/views/new.html',
                controller: 'UsersCreateCtrl',
                controllerAs: 'vm'
            })
            .when('/users/:id/edit', {
                templateUrl: '/app/users/views/edit.html',
                controller: 'UsersEditCtrl',
                controllerAs: 'vm'
            })
            .when('/users/:id', {
                templateUrl: '/app/users/views/show.html',
                controller: 'usersShowCtrl',
                controllerAs: 'vm'
            })
            .otherwise({redirectTo: '/'});

    }]);

}());
