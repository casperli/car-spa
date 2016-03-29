var carSpaDirectives = angular.module('carSpa.directives', []);

carSpaDirectives.directive('csFilterWidget', FilterWidget);
function FilterWidget() {
    return {
        restrict: 'E',
        templateUrl: 'templates/filterWidget.html',
        scope: {
            vm: '=viewModel'
        }
    }
}

carSpaDirectives.directive('csFilterDropdown', FilterDropdown);
function FilterDropdown() {
    return {
        restrict: 'E',
        templateUrl: 'templates/dropdownFilter.html',
        scope: {
            vm: '=viewModel',
            description: '@description'
        }
    }
}
