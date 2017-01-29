'use strict';

module.exports = angular.module('gloriumApp.PatientService', ['gloriumApp.DiagnosService'])

.factory('Patient', ['Diagnos', function (Diagnos) {

    var localStorageKey = 'patient';

    var defaults = {
        name: '',
        birthday: '',
        fullAddress: '',
        diagnoses: [],
        diagnosesHistory: []
    };

    var Patient = function (record) {
        record = record && typeof record == 'object' ? record : {};
        angular.forEach(defaults, function (defaultValue, key) {
            this[key] = record.hasOwnProperty(key) ? record[key] : defaultValue;
        }, this);

        /** @type {Array}  */
        this.diagnoses = Diagnos.createCollection(this.diagnoses, this);
        /** @type {Array}  */
        this.diagnosesHistory = Diagnos.createCollection(this.diagnosesHistory, this);
    };

    /**
     * @returns {Patient}
     */
    Patient.get = function () {
        var record;
        try {
            record = localStorage.getItem(localStorageKey);
            record = record && angular.fromJson(record);
        } catch(e) {
            record = null;
        }

        if(!record) {
            record = require('../sample-database.js');
        }

        var instance = new Patient(record);

        /**
         * хак-оптимизация для singleton-подобного класса Patient
         * @todo убрать хак в случае, если экземпляров Patient может быть более одного.
         */
        Patient.get = function () {
            return instance;
        };

        return instance;
    };

    Patient.prototype.save = function () {
        localStorage.setItem(localStorageKey, angular.toJson(this));
    };

    /**
     * @param {Diagnos} diagnos
     * @returns {Boolean}
     */
    Patient.prototype.hasDiagnos = function (diagnos) {
        return -1 != this.diagnoses.indexOf(diagnos) || -1 != this.diagnosesHistory.indexOf(diagnos);
    };

    return Patient;

}]);
