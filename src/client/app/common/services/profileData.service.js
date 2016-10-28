(function () {

    angular.module('vinylApp').factory('profileData', profileData);

         function profileData ($http, authentication) {

             var getProfile = function () {
                 return $http.get('/profile', {
                     headers: {
                         Authorization: 'Bearer '+ authentication.getToken()
                     }
                 });
             };

             var getProfiles = function () {

             };

             return {
                 getProfile : getProfile,
                 getProfiles : getProfiles
             };
         }

}());