(function () {

    angular.module('vinylApp').factory('usersData',
        ['$resource', 'authentication', usersData]);

    function usersData ($resource, authentication) {
        var url = '/users/:id';

        // Pass session token as Authorization header
        var headers = {
            'Authorization': function(){return 'Bearer ' + authentication.getToken();}
        };

        // Assemble actions with custom headers attached
        var actions = {
            'get'   : {method: 'GET', headers: headers},
            'save'  : {method: 'POST', headers: headers},
            'create': {method: 'POST', headers: headers},
            'query' : {method: 'GET', isArray: true, headers: headers},
            'remove': {method: 'DELETE', headers: headers},
            'delete': {method: 'DELETE', headers: headers},
            'update': {method: 'PUT', headers: headers}
        };

        var usersResource = $resource(url, {id: '@id'}, actions);

        var getAllUsers = function() {
            return usersResource.query();
        };

        var getUser = function(id) {
            return usersResource.get({id: id});
        };

        var updateUser = function(user) {
            return usersResource.update({id: user._id}, user)
                .$promise
                .then(function(res) {
                    authentication.saveToken(res.token);
                });
        };

        var createUser = function(user) {
            return usersResource.create(user)
                .$promise
                .then(function(res) {
                    authentication.saveToken(res.token);
                });
        };

        return {
            getUser: getUser,
            getAllUsers: getAllUsers,
            updateUser: updateUser,
            createUser: createUser
        };
    }
}());