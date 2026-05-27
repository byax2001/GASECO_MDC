import { Component, computed, signal } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import UOM from '../../../interfaces/uom.interface';
import { Parte } from '../../../interfaces/parte.interface';

@Component({
  selector: 'Orden-lines',
  imports: [ReactiveFormsModule],
  templateUrl: './orden-lines.html',
  styleUrl: './orden-lines.css',
})
export class OrdenLines {
  private fb = new FormBuilder();

  Parts = signal<Parte[]>([
    { codigo: 'P001', descripcion: 'Cilindro de Gas LP 20 lb' },
    { codigo: 'P002', descripcion: 'Cilindro de Gas LP 30 lb' },
    { codigo: 'P003', descripcion: 'Cilindro de Gas LP 45 lb' },
    { codigo: 'P004', descripcion: 'Cilindro de Gas LP 100 lb' },
  ]);

  UnidadesMedida = signal<UOM[]>([
    { uom: 'UND', desc: 'UND' },
    { uom: 'L', desc: 'L' },
    { uom: 'FT3', desc: 'FT3' },
    { uom: 'KG', desc: 'KG' },
    { uom: 'LB', desc: 'LB' },
    { uom: 'GAL', desc: 'GAL' },
  ]);

  Presentaciones = signal<number[]>([300, 220, 24.5, 10]);

  form = this.fb.nonNullable.group({
    lineas: this.fb.array([
      this.createLinea('P001', 2, 300, 'UND'),
      this.createLinea('P002', 1, 300, 'UND'),
    ])
  });

  get lineas() {
    return this.form.get('lineas') as FormArray;
  }

  createLinea(parte = '', cilindros = 0, presentacion = 0, uom = 'UND') {
    const group = this.fb.nonNullable.group({
      parte: [parte, Validators.required],
      cilindros: [cilindros, [Validators.required, Validators.min(0)]],
      presentacion: [presentacion, [Validators.required, Validators.min(0)]],
      uom: [uom, Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      ncertificado: [false, Validators.required],
      total: [{ value: cilindros * presentacion * 0, disabled: true }],
    });

    group.valueChanges.subscribe(value => {
      const total =
        Number(value.cilindros ?? 0) *
        Number(value.presentacion ?? 0)*
        Number(value.precio ?? 0);

      group.get('total')?.setValue(total, { emitEvent: false });
    });

    return group;
  }

  addLinea(): void {
    this.lineas.push(this.createLinea());
  }

  removeLinea(index: number): void {
    this.lineas.removeAt(index);
  }

  getLineasPedido() {
    return this.form.getRawValue().lineas;
  }
}