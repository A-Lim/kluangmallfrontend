import { ServiceLocator } from 'app/shared/services/servicelocator';
import { FileUploadService } from 'app/shared/services/fileupload.service';
import { map } from 'rxjs/operators';

export class ImageUploadAdapter {
  private _loader: any;
  private _fileUploadSvc: FileUploadService;

  constructor(loader: any) {
    this._loader = loader;
    this._fileUploadSvc = ServiceLocator.inject(FileUploadService);
  }

  public upload(): Promise<any> {
    return this._loader.file
      .then(file => this._fileUploadSvc.uploadFile(file)
        .pipe(
          map(response => { 
            return { default: response.data }
          })
        )
        .toPromise());
  }
}