(function() {

     angular.module('vinylApp').directive('tracklistEditor', tracklistEditor);

     function tracklistEditor() {
          return {
                restrict: 'E',
                templateUrl: '/app/vinyls/directives/tracklistEditor/tracklistEditor.template.html',
                controller: 'tracklistCtrl as tvm',
                scope: {
                    isReadOnly: "=",
                    tracklist: "="
                }
          };
     }
}());

