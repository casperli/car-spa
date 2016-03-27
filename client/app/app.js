'use strict'

var carSpa = angular.module('carSpa', ['ui.router', 'carSpa.services']);

carSpa.config(urlConfiguration);

urlConfiguration.$inject = ['$stateProvider', '$urlRouterProvider'];

function urlConfiguration($stateProvider, $urlRouterProvider){
 $urlRouterProvider.otherwise('/carList');
    $stateProvider.state('carList',{
        url: '/carList',
        templateUrl: 'templates/carList.html',
        controller: 'CarListController',
        controllerAs: 'vm'
    })
}


carSpa.controller('CarListController', CarListController);

CarListController.$inject = ['$scope', '$timeout', 'CarListService'];

function CarListController($scope, $timeout, CarListService) {
    var vm = this;

    vm.isInitialized = false;
    vm.showWelcome = true;
    vm.cars = [];

    function startWork() {
        vm.showWelcome = false;
    }

    function init() {
        $timeout(function () {
            vm.isInitialized = true;
            // We need this, cause no watched expression is triggered by the setTimeout function
            $scope.$apply();
        }, 1000);
    }

    function showCars() {
        CarListService.loadCars().then(function (cars) {
            vm.cars = cars;
        });
    }

    vm.startWork = startWork;
    vm.showCars = showCars;

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