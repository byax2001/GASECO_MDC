import { Component, inject, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Moneda } from '../../../../../ventas/interfaces/Moneda.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { UserInfoService } from '../../../../../../services/userInfo.service';
import { of, tap } from 'rxjs';
import { VentasQueryService } from '../../../../../ventas/services/ventasquery.service';
import { LiqViaticosHeaderControls} from '../../interfaces/LiqViaticosForm.interface';


@Component({
  selector: 'liq-viaticos-header',
  imports: [ReactiveFormsModule],
  templateUrl: './liq-viaticos-header.html',
  styleUrl: './liq-viaticos-header.css',
})
export class LiqViaticosHeader {

  //AQUI RECIBIRA Y ACTUALIZAR LOS DATOS DEL HEADER DE LA LIQUIDACION DE VIATICOS, COMO EL NOMBRE DEL USUARIO, LA EMPRESA, EL ID DE LA LIQUIDACION Y EL MONTO AUTORIZADO
  formLiqViaticosHeader = input.required<FormGroup<LiqViaticosHeaderControls>>();
  userInfoService = inject(UserInfoService);
  ventasQueryService = inject(VentasQueryService);

  LMonedas = rxResource<Moneda[], { company: string | null; }>({
      defaultValue: [],
      params: () => ({  
        company: this.userInfoService.company(),
      }),
      stream: ({ params }) => {
        if (!params.company ) {
              return of([]); // Retorna un observable con un array vacío si no hay empresa seleccionada
        }       
    
      return this.ventasQueryService.getMonedas().pipe(
      tap(monedas => {
        if (monedas.length > 0) {
          this.formLiqViaticosHeader().get('moneda')?.setValue(monedas[0].Currency_CurrencyCode);
        }
      })
    );
    }
  })

}
