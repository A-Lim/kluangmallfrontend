import { Directive, Input } from '@angular/core';
import { ValidationErrors, AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';

import { FileDetail } from 'app/shared/models/filedetail.model';

@Directive({
  selector: 'shared-fileinput [fileRequired]',
  providers: [{ 
    provide: NG_VALIDATORS, 
    useExisting: RequiredFileInputValidator, 
    multi: true
  }]
})
export class RequiredFileInputValidator implements Validator {
  @Input() files: FileDetail[] = [];

  validate(control: AbstractControl): ValidationErrors | null {
    const filesCount = this.files ? this.files.length : 0;
    const uploadFilesCount = control.value ? (<FileList>(control.value)).length : 0;

    if ((filesCount + uploadFilesCount) === 0) 
      return { fileRequired : true };

    return null;
  }
}