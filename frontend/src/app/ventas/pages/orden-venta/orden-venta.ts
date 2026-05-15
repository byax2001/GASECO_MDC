
import { Component, signal } from '@angular/core';
import { HeaderPage } from "../../../shared/components/header-page/header-page";
import { SearchDebounce } from "../../components/search-debounce/search-debounce";
import { FormsModule } from '@angular/forms';
import { Parte } from '../../interfaces/parte.interface';
import LineaPedido from '../../interfaces/lineapedido.interface';
import UOM from '../../interfaces/uom.interface';

@Component({
  selector: 'app-orden-venta',
  imports: [HeaderPage, SearchDebounce, FormsModule],
  templateUrl: './orden-venta.html',
  styleUrl: './orden-venta.css',
})
export default class OrdenVenta {
  location = 'US';
  frequency = 'daily';
  duration = 0.25;

  meetingTotal = 0;
  yearlyCost = 0;

  Parts = signal<Parte[]>([
    { codigo: 'P001', descripcion: 'Cilindro de Gas LP 20 lb' },
    { codigo: 'P002', descripcion: 'Cilindro de Gas LP 30 lb' },
    { codigo: 'P003', descripcion: 'Cilindro de Gas LP 45 lb' },
    { codigo: 'P004', descripcion: 'Cilindro de Gas LP 100 lb' },
  ]);

  LineasPedido = signal<LineaPedido[]>([
    { parte: 'P001', cilindros: 2, presentacion: 300, uom: 'UND', total: 40 },
    { parte: 'P002', cilindros: 1, presentacion: 300, uom: 'UND', total: 30 },
  ]);

  UnidadesMedida = signal<UOM[]>([
    { uom: 'UND', desc: 'UND' },
    { uom: 'L', desc: 'L' },
    { uom: 'FT3', desc: 'FT3' },
    { uom: 'KG', desc: 'KG' },
    { uom: 'LB', desc: 'LB' },
    { uom: 'GAL', desc: 'GAL' },
  ]);

  constructor() {
    //this.updateHourlyRates();
  }

  addLinea():void{
    this.LineasPedido.update(lineas => [...lineas, { parte: '', cilindros: 0, presentacion: 0, uom: 'UND', total: 0 }]);
  }

  updateLinea(index: number): void {
    const linea = this.LineasPedido()[index];
    const total = linea.cilindros * linea.presentacion;
    this.LineasPedido.update(lineas => {
        const updatedLineas = [...lineas];
        updatedLineas[index] = { ...linea, total: total }; // Copia toda la linea y luego actualiza el total
        return updatedLineas;
      }
    );
  }

  removeLinea(index: number): void {
    this.LineasPedido.update(lineas => {
        const updatedLineas = [...lineas];
        updatedLineas.splice(index, 1); // Elimina la linea en el índice especificado
        return updatedLineas;
      }
    );
  }

beautifyNumber(number: number): string {
    if (isNaN(number) || !isFinite(number)) {
      return 'Invalid number';
    }

    return number.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

/*


  updateHourlyRates(): void {
    this.attendees = this.attendees.map((attendee) => {
      const rate = this.hourlyRates[this.location][attendee.jobTitle] ?? 0;
      return {
        ...attendee,
        hourlyRate: rate,
      };
    });

    this.updateTotalCost();
  }

  updateHourlyRate(index: number): void {
    const attendee = this.attendees[index];
    attendee.hourlyRate = this.hourlyRates[this.location][attendee.jobTitle] ?? 0;
    this.updateTotalCost();
  }

  addAttendee(): void {
    this.attendees.push({
      jobTitle: 'Developer',
      hourlyRate: this.hourlyRates[this.location]['Developer'],
      attendeesCount: 1,
      totalCost: 0,
    });

    this.updateTotalCost();

    console.log(this.attendees);
  }

  removeRow(index: number): void {
    this.attendees.splice(index, 1);
    this.updateTotalCost();
  }


  updateTotalCost(): void {
    let total = 0;

    this.attendees = this.attendees.map((attendee) => {
      const cost = attendee.hourlyRate * attendee.attendeesCount * this.duration;
      total += cost;

      return {
        ...attendee,
        totalCost: Number(cost.toFixed(2)),
      };
    });

    this.meetingTotal = Number(total.toFixed(2));
    this.updateYearlyCost();
  }

  updateYearlyCost(): void {
    let yearlyMultiplier = 1;

    switch (this.frequency) {
      case 'daily':
        yearlyMultiplier = 260;
        break;
      case 'weekly':
        yearlyMultiplier = 52;
        break;
      case 'monthly':
        yearlyMultiplier = 12;
        break;
      case 'quarterly':
        yearlyMultiplier = 4;
        break;
      case 'yearly':
        yearlyMultiplier = 1;
        break;
    }

    this.yearlyCost = Number((this.meetingTotal * yearlyMultiplier).toFixed(2));
  }
*/
  onSearch(query: string): void {}
}
