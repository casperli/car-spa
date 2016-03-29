var carSpaControllers = angular.module('carSpa.controllers',[])

carSpaControllers.controller('CarListController', CarListController);
CarListController.$inject = ['CarListService', 'ReferenceDataService'];

function CarListController(CarListService, ReferenceDataService) {
    var vm = this;

    vm.cars = [];

    vm.filters = {
        yearFilter: {
            values: ReferenceDataService.loadYears(),
            selectedValue: null
        },
        brandFilter: {
            values: [],
            selectedValue: null
        },
        colourFilter: {
            values: [],
            selectedValue: null
        },
        doSearch: showCars,
        clear: clearFilter
    }

    function initReferenceData() {
        ReferenceDataService.loadBrands().then(function (data) {
            vm.filters.brandFilter.values = data;
        });

        ReferenceDataService.loadColours().then(function (data) {
            vm.filters.colourFilter.values = data;
        });
        ReferenceDataService.loadPresetValues().then(function (data) {
            vm.filters.brandFilter.selectedValue = data.brandFilter.selectedValue;
            vm.filters.colourFilter.selectedValue = data.colourFilter.selectedValue;
            vm.filters.yearFilter.selectedValue = data.yearFilter.selectedValue;
        });
    }

    function showCars(filters) {
        ReferenceDataService.savePresetValues(filters);

        CarListService.loadCars(filters.yearFilter.selectedValue, filters.brandFilter.selectedValue, filters.colourFilter.selectedValue)
            .then(function (cars) {
                vm.cars = cars;
            });
    }

    function clearFilter(filters) {
        filters.yearFilter.selectedValue = null;
        filters.colourFilter.selectedValue = null;
        filters.brandFilter.selectedValue = null;
        showCars(filters);
    }

    initReferenceData();

    return vm;
}

carSpaControllers.controller('WelcomeController', WelcomeController);
WelcomeController.$inject = ['$timeout'];

function WelcomeController($timeout) {
    var vm = this;

    vm.isInitialized = false;

    function init() {
        $timeout(function () {
            // By using the $timeout service, no scope.$apply usage is needed anymore
            vm.isInitialized = true;
        }, 1000);
    }

    init();

    return vm;
}
