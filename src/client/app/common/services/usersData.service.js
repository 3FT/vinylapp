(function () {

    angular.module('vinylApp').factory('usersData', usersData);

    function usersData ($resource) {

        var url = '/users/:id';

        var actions = {
            'query' : {method: 'GET', isArray: true}
        };

        var usersResource = $resource(url, {id: '@id'}, actions);

        var getAllUsers = function () {
            return usersResource.query();
        };
        var getUser = function (id) {
            return usersResource.get({id: id});
        };

        return {
            getUser : getUser,
            getAllUsers : getAllUsers
        };
    }

}());