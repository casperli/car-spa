'use strict'

var carSpa = angular.module('carSpa', ['ui.router', 'carSpa.services']);

carSpa.config(urlConfiguration);

urlConfiguration.$inject = ['$stateProvider', '$urlRouterProvider'];

function urlConfiguration($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/welcome');
    $stateProvider.state('carList', {
        url: '/carList',
        templateUrl: 'templates/carList.html',
        controller: 'CarListController',
        controllerAs: 'vm'
    });
    $stateProvider.state('welcome', {
        url: '/welcome',
        templateUrl: 'templates/welcome.html',
        controller: 'WelcomeController',
        controllerAs: 'vm'
    });
}


carSpa.controller('CarListController', CarListController);
CarListController.$inject = ['CarListService', 'ReferenceDataService'];

function CarListController(CarListService, ReferenceDataService) {
    var vm = this;

    vm.cars = [];
    vm.years = ReferenceDataService.loadYears();
    vm.colours = [];
    vm.brands = [];

    vm.selectedBrand=null;
    vm.selectedColour=null;
    vm.selectedYear=null;

    function initReferenceData() {
        ReferenceDataService.loadBrands().then(function (data) {
            vm.brands = data;
        });

        ReferenceDataService.loadColours().then(function (data) {
            vm.colours = data;
        });
    }

    function showCars() {
        CarListService.loadCars(vm.selectedYear, vm.selectedBrand, vm.selectedColour)
            .then(function (cars) {
                vm.cars = cars;
            });
    }

    vm.showCars = showCars;

    initReferenceData();

    return vm;
}

carSpa.controller('WelcomeController', WelcomeController);
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

// We use a new module for services instead of putting the service into the app module directly
var services = angular.module('carSpa.services', []);
services.factory('CarListService', CarListService);

CarListService.$inject = ['$http', '$q'];

function CarListService($http, $q) {

    function loadCars(year, brand, colour) {
        var deferred = $q.defer();

        var carAddress = 'http://localhost:8081/cars';
        var params = {params: {year: year, brand: brand, colour: colour}};

        $http.get(carAddress, params).then(function (response) {
            var cars = angular.copy(response.data);
            deferred.resolve(cars);
        });

        return deferred.promise;
    }

    return {
        loadCars: loadCars
    }
}

services.factory('ReferenceDataService', ReferenceDataService);
ReferenceDataService.$inject = ['$http', '$q'];

function ReferenceDataService($http, $q) {

    function loadColours() {
        return loadData('colours');
    }

    function loadBrands() {
        return loadData('brands');
    }

    function loadYears() {
        return initYears(1960, 2016);
    }

    function loadData(apiEntity) {
        var deferred = $q.defer();

        $http.get('http://localhost:8081/' + apiEntity).then(function (response) {
            var entities = angular.copy(response.data);
            deferred.resolve(entities);
        })

        return deferred.promise;
    }

    function initYears(begin, end) {
        var years = [];

        for (var i = begin; i <= end; i++) {
            years.push(i);
        }

        return years;
    }

    return {
        loadColours: loadColours,
        loadBrands: loadBrands,
        loadYears: loadYears
    }
}