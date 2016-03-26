'use strict'

var carSpa = angular.module('carSpa', []);

carSpa.controller('CarListController', CarListController);

function CarListController($scope) {
    var vm = this;

    vm.isInitialized = false;
    vm.showWelcome = true;

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

    vm.startWork = startWork;

    init();
    
    return vm;
}
