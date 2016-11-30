(function() {

    angular.module('vinylApp').factory('authentication', authentication);

    function authentication ($http, $window) {

        var saveToken = function (token) {
            $window.localStorage['mean-token'] = token;
        };

        var getToken = function () {
            return $window.localStorage['mean-token'];
        };

        var isLoggedIn = function() {
            var token = getToken();
            var payload;

            if(token){
                payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);

                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        var currentUser = function() {
            if(isLoggedIn()){
                var token = getToken();
                var payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);
                return {
                    _id: payload._id,
                    email: payload.email
                   // name: payload.name
                };
            }
        };

        var register = function(user) {
            return $http.post('/auth/register', user).success(function(data){
                saveToken(data.token);
            });
        };

        var login = function(user) {
            return $http.post('/auth/login', user).success(function(data) {
                saveToken(data.token);
            });
        };

        var logout = function() {
            $window.localStorage.removeItem('mean-token');
        };

        return {
            currentUser : currentUser,
            saveToken : saveToken,
            getToken : getToken,
            isLoggedIn : isLoggedIn,
            register : register,
            login : login,
            logout : logout
        };
    }

}());