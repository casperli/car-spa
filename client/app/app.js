'use strict'

var carSpa = angular.module('carSpa', []);

carSpa.controller('CarListController', CarListController);

CarListController.$inject = ['$scope', '$http'];

function CarListController($scope, $http) {
    var vm = this;

    vm.isInitialized = false;
    vm.showWelcome = true;
    vm.cars = [];

    function startWork() {
        vm.showWelcome = false;
    }

    function init() {
        setTimeout(function () {
            vm.isInitialized = true;
            // We need this, cause no watched expression is triggered by the setTimeout function
            $scope.$apply();
        }, 2000);
    }

    function showCars() {
        vm.cars = [];

        $http.get('http://localhost:8081/api/cars').then(function (response) {
            vm.cars = angular.copy(response.data);
        });
    }

    vm.startWork = startWork;
    vm.showCars = showCars;

    init();

    return vm;
}