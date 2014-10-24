var euklidCalculator = angular.module('euklidCalculator', []);

euklidCalculator.controller('EuklidCtrl', function ($scope) {
    $scope.result = defaultEuklid();
    $scope.inputChanged = function(nx, ny){
        $scope.result = euklid(nx, ny);
    }
});