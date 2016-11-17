(function () {

    angular.module('vinylApp').factory('vinylsData', vinylsData);

    function vinylsData ($resource, Upload, authentication) {

        var url = '/vinyls/:id';
        var urlReview = '/vinyls/reviews/:id';

        // Pass session token as Authorization header
        var headers = {
             'Authorization': function(){ return 'Bearer ' + authentication.getToken(); }
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

        var vinylResource = $resource(url, {id: '@id'}, actions);
        var vinylReviewResource = $resource(urlReview, {id: '@id'}, actions);



        var getAllVinyls = function () {
            return vinylResource.query();
        };
        var getVinyl = function (id) {
            return vinylResource.get({id: id});
        };

        var createVinyl = function (vinyl) {
            return vinylResource.create(vinyl);
        };

        var updateVinyl = function (vinyl) {
            return vinylResource.update({id: vinyl._id}, vinyl);
        };
        var deleteVinyl = function (id) {
            return vinylResource.delete({id: id});
        };

        var updateVinylFile = function(vinyl){

            var frontCover = vinyl.images && vinyl.images.frontCover;
            var backCover = vinyl.images && vinyl.images.backCover;

            return Upload.upload({
                method: 'PUT',
                url: '/vinyls/files/' + vinyl._id,
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                },
                data:   {
                    frontCover: frontCover,
                    backCover: backCover
                }
            });

        };

        var updateVinylReview = function(vinyl) {
            return vinylReviewResource.update({id: vinyl._id}, vinyl);
        };


        return {
            getAllVinyls: getAllVinyls,
            getVinyl: getVinyl,
            createVinyl: createVinyl,
            updateVinyl: updateVinyl,
            deleteVinyl: deleteVinyl,
            updateVinylFile: updateVinylFile,
            updateVinylReview: updateVinylReview

        };
    }

}());



