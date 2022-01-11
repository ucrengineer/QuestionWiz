import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ConfirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return formGroup;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

export function confirmValidator(formGroup:FormGroup){

  if (formGroup.get('password') != formGroup.get('confirmedPass')){
    formGroup.controls.confirmedPass.setErrors({
      notUnique : true
    })
  }
  else{
    formGroup.controls.confirmedPass.setErrors({
      notUnique : false
    })
  }

}




