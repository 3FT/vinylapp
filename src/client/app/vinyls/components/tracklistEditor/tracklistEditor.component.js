(function() {
    'use strict';

    angular.module('vinylApp').component('tracklistEditor', {
        templateUrl: '/app/vinyls/components/tracklistEditor/tracklistEditor.template.html',
        controller: TracklistController,
        controllerAs: 'vm',
        bindings: {
            tracklist: '=',
            isReadOnly: '='
        }
    });

    function TracklistController() {
        var vm = this;

        vm.addTrack = function(track, tracklist){
            tracklist.push(track);
            initTrack();
        };

        vm.removeTrack = function(track, tracklist){
            var index = tracklist.indexOf(track);
            tracklist.splice(index,1);
        };

        function initTrack() {
            vm.track = {
                title:'',
                duration: {minutes: '', seconds: ''}
            };
        }

        vm.sortableOptions = {
            update: function(e, ui) {console.log(vm.tracklist);
            }
        };
    }

}());

