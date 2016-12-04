(function() {
    'use strict';

    angular.module('vinylApp').controller('tracklistCtrl', tracklistCtrl);

    function tracklistCtrl() {
        var tvm = this;

        tvm.addTrack = function(track, tracklist){
            tracklist.push(track);
            initTrack();
        };

        tvm.removeTrack = function(track, tracklist){
            var index = tracklist.indexOf(track);
            tracklist.splice(index,1);
        };

        function initTrack() {
            tvm.track = {
                        title:'',
                        duration: {minutes: '', seconds: ''}
                        };
        }
    }
}());