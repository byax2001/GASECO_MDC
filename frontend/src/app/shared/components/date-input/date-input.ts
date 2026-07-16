import { Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'date-input',
  imports: [],
  templateUrl: './date-input.html',
  styleUrl: './date-input.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInput),
      multi: true
    }
  ]
})
export class DateInput implements ControlValueAccessor {
  placeholder = input.required<string>();
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
