import { Component, input } from '@angular/core';
import { OVPendiente } from '../../interfaces/OVPendiente.interface';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'ovpendiente-table',
  imports: [DatePipe],
  templateUrl: './ovpendiente-table.html',
  styleUrl: './ovpendiente-table.css',
})
export class OVPendienteTable {
  OVPendientes = input.required<OVPendiente[]>();


}
