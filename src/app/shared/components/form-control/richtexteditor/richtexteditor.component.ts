import { Component, OnInit, OnDestroy, Input, forwardRef, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ImageUploadAdapter } from 'app/shared/components/form-control/richtexteditor/imageupload.adapter';

@Component({
  selector: 'shared-rich-text-editor',
  templateUrl: './richtexteditor.component.html',
  styleUrls: ['./richtexteditor.component.css'],
  providers: [     
    {
      provide: NG_VALUE_ACCESSOR, 
      useExisting: forwardRef(() => RichTextEditorComponent),
      multi: true     
    },
    {
      provide: NG_VALIDATORS, 
      useExisting: forwardRef(() => RichTextEditorComponent),
      multi: true     
    }
  ]
})
export class RichTextEditorComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input()
  required: boolean = false;

  onChanged = (value: string) => {};
  onTouched = () => {};

  Editor = ClassicEditor;
  value: string;
  disabled: boolean = false;

  constructor() { }

  ngOnInit() {
    // const tools = Array.from( ClassicEditor.ui.componentFactory.names() );
    // const plugins = ClassicEditor.builtinPlugins.map( plugin => plugin.pluginName );
    // console.log(plugins);
    // console.log(ClassicEditor);
  }

  onReady(eventData) {
    eventData.plugins.get('FileRepository').createUploadAdapter = function (loader) {
      return new ImageUploadAdapter(loader);
    };
  }

  ngOnDestroy() {
  }

  writeValue(value: string) {
    if (value)
      this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  onChange() {
    this.onChanged(this.value);
  }

  validate(control: AbstractControl): ValidationErrors {
    if (control.value == '' || control.value == null)
      return { required : true };
  }
}