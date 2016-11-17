(function () {

    angular.module('vinylApp').directive('footer', footer);

    function footer () {
        return {
            restrict: 'E',
            templateUrl: '/app/common/directives/footer/footer.template.html'
        };
    }

})();