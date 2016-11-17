(function () {

    angular.module('vinylApp').controller('tracklistCtrl', tracklistCtrl);

    function tracklistCtrl() {

        var tvm = this;

        tvm.addTrack = function(track, vinyl){

           if (!vinyl.tracklist) {vinyl.tracklist = [];}
           vinyl.tracklist.push({ title : track.title, length: track.length});

        };

        tvm.removeTrack = function(track, vinyl){

            var index = vinyl.tracklist.indexOf(track);
            vinyl.tracklist.splice(index,1);

        };

    }

}());