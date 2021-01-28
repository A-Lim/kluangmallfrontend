import { Directive } from '@angular/core';
import { ValidationErrors, AbstractControl, Validator, NG_VALIDATORS, FormGroup, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[isLimitUnique]',
  providers: [{ 
    provide: NG_VALIDATORS, 
    useExisting: IsLimitUniqueValidator, 
    multi: true
  }]
})
export class IsLimitUniqueValidator implements Validator {
  private _validatorFn;

  constructor() {
    this._validatorFn = this.validator();
  }

  validate(formGroup: FormGroup): ValidationErrors | null {
    return this._validatorFn(formGroup);
  }

  validator(): ValidatorFn {
    return (formGroup: FormGroup) => {
      const values = Object.keys(formGroup.value)
        // retrieve filter by key and where value is not (null/empty)
        .filter(x => x.includes('limitType_') && formGroup.value[x])
        .map(x => formGroup.value[x]);

      if (values.length == 0)
        return null;
      
      let hasError = false;
      for (const key in formGroup.controls) {
        const count = values.filter(x => x === formGroup.controls[key].value).length;
        if (count > 1) {
          hasError = true;
          formGroup.controls[key].setErrors(<ValidationErrors>{ isLimitUnique: true });
        }
      }

      if (!hasError)
        this._deleteError(formGroup);

      return null;
    }
  }

  private _deleteError(formGroup: FormGroup) {
    for (const key in formGroup.controls) {
      if (formGroup.controls[key].hasError('isLimitUnique')) {
        delete formGroup.controls[key].errors.isLimitUnique;
        formGroup.controls[key].updateValueAndValidity({ onlySelf: true });
      }
    }
  }
}