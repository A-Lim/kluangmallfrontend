import { AbstractControl } from '@angular/forms';

export default class Utils {

  static deleteError(formControl: AbstractControl, error: string) {
    if (formControl.hasError(error))
      delete formControl.errors[error];

    if (Utils.isEmpty(formControl.errors))
      formControl.setErrors(null) 
  }

  static isEmpty(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
    }
    return true;
  }

  static appendFormData(formData, data, rootName) {
    let root = rootName || '';
    if (data instanceof File) {
        formData.append(root, data);
    } else if (Array.isArray(data)) {
        for (var i = 0; i < data.length; i++) {
            this.appendFormData(formData, data[i], root + '[' + i + ']');
        }
    } else if (typeof data === 'object' && data) {
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if (root === '') {
                    this.appendFormData(formData, data[key], key);
                } else {
                    this.appendFormData(formData, data[key], root + '[' + key + ']');
                }
            }
        }
    } else {
        if (data !== null && typeof data !== 'undefined') {
            formData.append(root, data);
        }
    }
  }
}