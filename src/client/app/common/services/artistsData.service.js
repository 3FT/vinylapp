(function() {

    angular.module('vinylApp').factory('artistsData',
        ['$resource', 'authentication','Upload', artistsData]);

    function artistsData($resource, authentication, Upload) {

        var url = '/artists/:id';

        // Pass session token as Authorization header
        var headers = {
            'Authorization': function() {return 'Bearer ' + authentication.getToken();}
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

        var artistResource = $resource(url, {id: '@id'}, actions);

        var getAllArtists = function() {
            return artistResource.query();
        };

        var getArtist = function(id) {
            return artistResource.get({id: id});
        };

        var createArtist = function(artist) {
            return artistResource.create(artist);
        };

        var deleteArtist = function(id) {
            return artistResource.delete({id: id});
        };

        var updateArtist = function(artist) {
            return artistResource.update({id: artist._id}, artist);
        };

        var updateArtistFiles = function(artist){
            var images = artist.images;
            return Upload.upload({
                method: 'PUT',
                url: '/artists/files/' + artist._id,
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                },
                arrayKey: '',
                data: {
                    images: images
                }
            });

        };

        return {
            getAllArtists: getAllArtists,
            getArtist: getArtist,
            createArtist: createArtist,
            deleteArtist: deleteArtist,
            updateArtist: updateArtist,
            updateArtistFiles: updateArtistFiles
        };
    }

}());



