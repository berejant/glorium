'use strict'; module.exports = angular.module('app.templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('src/diagnoses-list/confirm-remove-modal.html','<div class="modal ng-animate"><div class=modal-dialog><div class=modal-content><div class=modal-header><button class=close ng-click=close(false) type=button data-dismiss=modal aria-hidden=true>&times;</button><h4 class=modal-title>Confirm remove</h4></div><div class=modal-body><p>Do you really remove this diagnos (code:<span ng-bind=diagnos.code></span>) ?</p></div><div class=modal-footer><button class="btn btn-default"ng-click=close(false) type=button data-dismiss=modal>No</button><button class="btn btn-danger"ng-click=close(true) type=button>Yes, do remove</button></div></div></div></div>');
$templateCache.put('src/diagnoses-list/diagnoses-list.html','<div class="content-panel content-panel_type-diagnoses-list"><div class=content-panel__header>Current Diagnoses</div><div class=diagnoses-list-empty ng-if=!patient.diagnoses.length>No Diagnoses</div><div class="diagnoses-list diagnoses-list_type-current"ng-show=patient.diagnoses.length><div class=diagnoses-list__header><div class=diagnoses-list__code>Code</div><div class=diagnoses-list__diagnosis>Diagnosis</div><div class=diagnoses-list__addition-date>Addition Date</div><div class=diagnoses-list__actions></div></div><div class=diagnoses-list__body><div class=diagnoses-list__item ng-repeat="diagnos in patient.diagnoses"><div class=diagnoses-list__code ng-bind=diagnos.code></div><div class=diagnoses-list__diagnosis ng-bind=diagnos.diagnosis></div><div class=diagnoses-list__addition-date ng-bind=diagnos.additionDate></div><div class=diagnoses-list__actions><div class=diagnoses-list__action-edit ui-sref=edit-diagnos({id:$index})></div><div class=diagnoses-list__action-remove ng-click=remove(diagnos)></div></div></div></div></div></div><div class="content-panel content-panel_type-diagnoses-list"><div class=content-panel__header>Diagnoses History:</div><div class="diagnoses-list-empty diagnoses-list-empty_type-history"ng-if=!patient.diagnosesHistory.length>No Diagnoses</div><div class="diagnoses-list diagnoses-list_type-history"ng-show=patient.diagnosesHistory.length><div class=diagnoses-list__header><div class=diagnoses-list__code>Code</div><div class=diagnoses-list__diagnosis>Diagnosis</div><div class=diagnoses-list__addition-date>Addition Date</div><div class=diagnoses-list__removal-date>Removal Date</div></div><div class=diagnoses-list__body><div class=diagnoses-list__item ng-repeat="diagnos in patient.diagnosesHistory"><div class=diagnoses-list__code ng-bind=diagnos.code></div><div class=diagnoses-list__diagnosis ng-bind=diagnos.diagnosis></div><div class=diagnoses-list__addition-date ng-bind=diagnos.additionDate></div><div class=diagnoses-list__removal-date ng-bind=diagnos.removalDate></div></div></div></div></div>');
$templateCache.put('src/edit-diagnos/edit-diagnos-form.html','<div class="content-panel content-panel_type-current"><div class=content-panel__header><span ng-if=isNew>Add New Diagnos:</span><span ng-if=!isNew>Edit Diagnos #<span ng-bind=diagnos.code></span>:</span></div><form class="form form_edit-diagnos"name=diagnosForm ng-submit=save($event);><div class=form__row><div class="form__form-group form__form-group_field_code"><label for=edit-diagnos_code>Code: *</label><input type=text class=form__form-control id=edit-diagnos_code name=code placeholder=Code ng-model=diagnos.code pattern=[0-9]{6,} required></div></div><div class=form__row><div class=form__form-group><label for=edit-diagnos_diagnosis>Diagnos: *</label><input type=text class=form__form-control id=edit-diagnos_diagnosis name=diagnosis placeholder=Diagnos ng-model=diagnos.diagnosis required></div></div><div class="form__row form__row_footer"><div class=form__form-group><button class=form__btn-submit type=submit>Save</button></div></div></form></div>');
$templateCache.put('src/patient-sidebar/patient-sidebar.html','<div class=patient-sidebar><div class=patient-sidebar__name><span ng-bind=patient.name class=patient-sidebar__name-value></span><div class=patient-sidebar__edit ui-sref=edit-patient></div></div><div class=patient-sidebar__birthday><div class=patient-sidebar__birthday-label>Birthday:</div><div class=patient-sidebar__birthday-value ng-bind=patient.birthday></div></div><div class=patient-sidebar__full-address-label>Full address:</div><div class=patient-sidebar__full-address-value ng-bind=patient.fullAddress></div></div>');
$templateCache.put('src/edit-patient/edit-patient-form.html','<div class="content-panel content-panel_type-current"><div class=content-panel__header>Edit Patient:</div><form class="form form_edit-patient"name=patientForm ng-submit=save($event);><div class=form__row><div class="form__form-group form__form-group_field_name"><label for=edit-patient_name>Patient Name: *</label><input type=text class=form__form-control id=edit-patient_name name=name placeholder="Patient name"ng-model=patient.name required></div><div class="form__form-group form__form-group_field_birthday"><label for=edit-patient_birthday>DOB: *</label><input type=text class=form__form-control id=edit-patient_birthday name=birthday ng-model=patient.birthday ui-mask=99/99/9999 required pattern=[0-9]{2}/[0-9]{2}/[0-9]{4}></div></div><div class=form__row><div class=form__form-group><label for=edit-patient_address>Full address: *</label><input type=text class=form__form-control id=edit-patient_address name=address placeholder="Full address"ng-model=patient.fullAddress required></div></div><div class="form__row form__row_footer"><div class=form__form-group><button class=form__btn-submit type=submit>Save</button></div></div></form></div>');}]);