'use strict';

module.exports = angular.module('gloriumApp.EditPatient', ['ui.router', 'gloriumApp.PatientService'])

.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('edit-patient', {
        url: '/edit',
        templateUrl: 'src/edit-patient/edit-patient-form.html',
        controller: 'EditPatientController',
        ncyBreadcrumb: {
            parent: 'patients',
            label: 'Edit patient {{patient.name}}'
        }
    });
}])

.controller('EditPatientController', ['$scope', '$state', '$timeout', 'Patient', 'DateHelper',
    function ($scope, $state, $timeout, Patient, DateHelper) {
        /** @var {Patient} Пациент. Теоретически, полученние Patient долно быть по id указанному в $stateParams (url) */
        var patient = Patient.get();
        $scope.setPatient(patient);

        $scope.save = function ($event) {
            $event && $event.preventDefault();

            if($scope.patientForm.$valid) {
                patient.save();
                $state.go('diagnoses');
            }
        };

        $scope.$watch('patient.birthday', function (birthday) {
            if(birthday && birthday.indexOf('/') == -1) {
                patient.birthday = birthday.substr(0, 2) + '/' + birthday.substr(2, 2) + '/' + birthday.substr(4);
            }

            try {
                var date = DateHelper.parse(birthday);
                if(date > new Date()) {
                    throw 'Birthdate must be in past';
                }
                $scope.patientForm.birthday.$setValidity('date', true);
            } catch (e) {
                $scope.patientForm.birthday.$setValidity('date', false);
            }
        });
    }]);
