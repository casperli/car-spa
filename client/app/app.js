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
CarListController.$inject = ['CarListService'];

function CarListController(CarListService) {
    var vm = this;

    vm.cars = [];
    vm.years = initYears(1960, 2016);

    function initYears(begin, end) {
        var years = [];

        for (var i = begin; i <= end; i++) {
            years.push(i);
        }

        return years;
    }

    function showCars() {
        CarListService.loadCars().then(function (cars) {
            vm.cars = cars;
        });
    }

    vm.showCars = showCars;

    return vm;
}

carSpa.controller('WelcomeController', WelcomeController);
WelcomeController.$inject = ['$scope', '$timeout'];

function WelcomeController($scope, $timeout) {
    var vm = this;

    vm.isInitialized = false;

    function init() {
        $timeout(function () {
            vm.isInitialized = true;
            // We need this, cause no watched expression is triggered by the setTimeout function
            $scope.$apply();
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

    function loadCars() {
        var deferred = $q.defer();

        $http.get('http://localhost:8081/api/cars').then(function (response) {
            var cars = angular.copy(response.data);
            deferred.resolve(cars);
        })

        return deferred.promise;
    }

    return {
        loadCars: loadCars
    }
}