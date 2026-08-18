import { Pipe, PipeTransform } from '@angular/core';
import { Moneda } from '../Modulos/ventas/interfaces/Moneda.interface';

@Pipe({
  name: 'ExchangeCurrency',
})
export class ExchangeCurrencyPipe implements PipeTransform {

  transform(Monedas: Moneda[], Moneda: String, valor:number): unknown {
    if (!Monedas || Monedas.length === 0) {
      return 0;
    }
    const monedaSeleccionada = Monedas.find(
      m => m.Currency_CurrencyCode === Moneda
    );
    const rate:number= monedaSeleccionada?.Calculated_Rate ?? 0;

    return rate===0?0: valor/rate;
  }

}
