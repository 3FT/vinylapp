(function () {

    angular.module('vinylApp').controller('tracklistCtrl', tracklistCtrl);

    function tracklistCtrl() {
        var tvm = this;

        initTrack();

        tvm.addTrack = function(track, vinyl){
           if (!vinyl.tracklist) {vinyl.tracklist = [];}
           // vinyl.tracklist.push({ title : track.title, length: track.length});
            vinyl.tracklist.push(track);
            console.log("added ", track , " inside " , vinyl);
            initTrack();
        };

        tvm.removeTrack = function(track, vinyl){
            var index = vinyl.tracklist.indexOf(track);
            vinyl.tracklist.splice(index,1);
        };

        function initTrack() {
            tvm.track = {title:'', duration: {}};
        }
    }

}());