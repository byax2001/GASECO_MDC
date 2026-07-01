import { Component, forwardRef, input, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'Inputg',
  imports: [],
  templateUrl: './inputg.html',
  styleUrl: './inputg.css',
   changeDetection: ChangeDetectionStrategy.Eager,
   providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Inputg),
      multi: true
    }
  ]
})


export class Inputg implements ControlValueAccessor {
  placeholder = input.required<string>();
  type = input.required<string>();
  idinput = input.required<string>();

  value = '';
  disabled = false;
  showPassword = false;

  onChange = (_value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  updateValue(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
