'EditDiagnosController';

'use strict';

module.exports = angular.module('gloriumApp.EditDiagnos', ['ui.router', 'gloriumApp.PatientService', 'gloriumApp.DiagnosService'])

.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('edit-diagnos', {
        url: '/diagnoses/:id',
        templateUrl: 'src/edit-diagnos/edit-diagnos-form.html',
        controller: 'EditDiagnosController',
        ncyBreadcrumb: {
            parent: 'diagnoses',
            label: '{{isNew ? diagnos.code : "New diagnos"}} {{diagnos.diagnosis|limitTo:50}}'
        }
    });
}])

.controller('EditDiagnosController', ['$scope', '$state', '$stateParams', 'Patient', 'Diagnos',
    function ($scope, $state, $stateParams, Patient, Diagnos) {
        /** @var {Patient} Пациент. Теоретически, полученние Patient долно быть по id указанному в $stateParams (url) */
        var patient = Patient.get();
        $scope.setPatient(patient);

        var diagnos;
        if('new' == $stateParams.id) {
            diagnos = new Diagnos({}, patient);
            $scope.isNew = true;

        } else {
            var id = parseInt($stateParams.id);
            if(!patient.diagnoses[id]) { // 404 diagnos not found in the list
                $state.go('diagnoses', {}, {location: 'replace'});
            }

            diagnos = patient.diagnoses[id];
        }

        $scope.diagnos = diagnos;

        $scope.save = function ($event) {
            $event && $event.preventDefault();
            if($scope.diagnosForm.$valid) {
                diagnos.save();
                $state.go('diagnoses');
            }
        };

    }]);

