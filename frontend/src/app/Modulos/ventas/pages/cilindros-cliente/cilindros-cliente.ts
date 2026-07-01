import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { TableCilindros } from './components/table-cilindros/table-cilindros';
import { HeaderPage } from "../../../../shared/components/header-page/header-page";
import Cilindro from '../../interfaces/cilindro.interface';
import { CilindroCliente } from './components/Interface/CilindroCliente.interface';
import { CilcliService } from '../../services/cilcli.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerLoad } from "../../../../shared/components/spinner-load/spinner-load";
import { FilesAdmin } from '../../../../services/files-admin.service';
import { ButtonIcon } from "../../../../shared/components/button-icon/button-icon";

@Component({
  selector: 'app-cilindros-cliente',
  imports: [TableCilindros, HeaderPage, SpinnerLoad, ButtonIcon],
  templateUrl: './cilindros-cliente.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './cilindros-cliente.css',
})
export default class CilindrosCliente {
  lcilindros = signal<CilindroCliente[]>([
  ]);
  loading = signal<boolean>(false);
  private route = inject(ActivatedRoute);
  cilindroClienteService = inject(CilcliService);
  adminFileService = inject(FilesAdmin);
  onSearchChange(searchValue: string) {
    const filteredCilindros = this.lcilindros().filter((cilindro) =>
      cilindro.SERIE.toLowerCase().includes(searchValue.toLowerCase())
    );
    this.lcilindros.set(filteredCilindros);
  }

  ngOnInit() {
    this.loading.set(true);
    this.route.params.subscribe((params) => {
      const CustID = params['custid'];
      this.cilindroClienteService.getCilCliByCustID(CustID).subscribe((data) => {
        this.lcilindros.set(data);
        this.loading.set(false);
      });
    })
  }

  descargarExcel(){
    if(this.lcilindros().length == 0){
      alert('No hay datos para exportar');
      return;
    }
    /*
    
    CVECLIENTE_C:   number;
    NOMBRE_C:       string;
    FHEMISION:      Date;
    CVEPRODUCTO_CP: string;
    CVEENVASE_F:    string;
    DESCENVASE:     string;
    DESCCORTA_CP:   string;
    IDCILINDRO:     number;
    SERIE:          string;
    NUMREMISION:    number;
    SUCURSAL:       string;*/
    const data = this.lcilindros().map(cilindro => ({
      CVECLIENTE_C: cilindro.CVECLIENTE_C,
      NOMBRE_C: cilindro.NOMBRE_C,
      FHEMISION: cilindro.FHEMISION,
      CVEPRODUCTO_CP: cilindro.CVEPRODUCTO_CP,
      CVEENVASE_F: cilindro.CVEENVASE_F,
      DESCENVASE: cilindro.DESCENVASE,
      DESCCORTA_CP: cilindro.DESCCORTA_CP,
      IDCILINDRO: cilindro.IDCILINDRO,
      SERIE: cilindro.SERIE,
      NUMREMISION: cilindro.NUMREMISION,
      SUCURSAL: cilindro.SUCURSAL
    }));
    this.adminFileService.descargarXLSX(data, 'CilindrosCliente');
  }
  
  
}
