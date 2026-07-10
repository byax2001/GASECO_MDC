import { Component, ChangeDetectionStrategy, signal, effect, inject, viewChild, ViewChild } from '@angular/core';
import { HeaderPage } from "../../../../shared/components/header-page/header-page";
import { CilindroScan } from '../../components/CilindroScan.interface';
import { EscaneoService } from './services/escaneo.service';
import { Modalg } from "../../../../shared/components/modalg/modalg";
import { TablaCilindrosEsc } from "./components/tabla-cilindros-esc/tabla-cilindros-esc";
import { FilesAdmin } from '../../../../services/files-admin.service';
import { ButtonIcon } from '../../../../shared/components/button-icon/button-icon';

@Component({
  selector: 'app-scanner-cil',
  imports: [HeaderPage, Modalg, TablaCilindrosEsc, ButtonIcon],
  templateUrl: './scanner-cil.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './scanner-cil.css',
})
export default class ScannerCil {
  cilindro = signal<string>('');
  cilindrosEscaneados = signal<CilindroScan[]>([]);
  adminFileService = inject(FilesAdmin);
  escaneoService = inject(EscaneoService);
  @ViewChild('modalG') modalG!: Modalg;

  debounceEffect = effect((onCleanup) =>{
    const value = this.cilindro();
    if(value === '') return; //Si el valor es vacío, no se emite nada

    const timeout = setTimeout(() => {
      //Luego de 500ms de inactividad, se emite el valor del input
      this.buscarCilindro(value);
      console.log('Emitted value:', value);
    }, 100);

    onCleanup(() => {
      clearTimeout(timeout);
    });
  })

  //SE BUSCA EL CILINDRO EN BASE A SU SERIE
  buscarCilindro(cilindro?: string) {
    console.log('Cilindro escaneado:', cilindro);
    this.escaneoService.buscarCilindro(cilindro!).subscribe({
      next: (data) => {
        if(data.length === 0){
          this.modalG.showModalG('Cilindro no encontrado', 'No se encontro ningun cilindro con la serie: ' + cilindro + '.');
        }

        if(data.length >1 ){
          this.modalG.showModalG('Cilindro Duplicado', 'Se encontro mas de un cilindro con la misma serie.');
        }
        this.cilindrosEscaneados.update(actual => [
          ...actual,
          ...data
        ]);
        this.cilindro.set('');
      },
      error: (error) => {
        console.error('Error al buscar el cilindro:', error);
        this.cilindro.set('');
      },
    });
  }

  removeLinea(index: number) {
    this.cilindrosEscaneados.update(actual => {
      const newArray = [...actual];
      newArray.splice(index, 1);
      return newArray;
    });
  }


  descargarExcel() {
    if(this.cilindrosEscaneados().length == 0){
      alert('No hay datos para exportar');
      return;
    }
    const data = this.cilindrosEscaneados().map(cilindro => ({
      IDCILINDRO: cilindro.IDCILINDRO,
      SERIE: cilindro.SERIE,
      CVEPRODUCTO_CP: cilindro.CVEPRODUCTO_CP, 
      CVEENVASE: cilindro.CVEENVASE,
      UBACTUAL: cilindro.UBACTUAL,
      REFUBACTUAL: cilindro.REFUBACTUAL,
      UBANTERIOR: cilindro.UBANTERIOR,
      REFUBANTERIOR: cilindro.REFUBANTERIOR,
      MTSCUBICOS: cilindro.MTSCUBICOS,
      FHREGISTRO: cilindro.FHREGISTRO,
      USUARIO: cilindro.USUARIO,
      STATUS: cilindro.STATUS,
      OBSERVACION: cilindro.OBSERVACION,
      NUMCERTIFICADO: cilindro.NUMCERTIFICADO,
      FECHAPH: cilindro.FECHAPH,
      EXPPERMITIDA: cilindro.EXPPERMITIDA,
      RANGOEXP: cilindro.RANGOEXP,
      EXPTOTAL: cilindro.EXPTOTAL,
      PESO: cilindro.PESO,
      CAPACIDAD: cilindro.CAPACIDAD,
      FABRICANTE: cilindro.FABRICANTE,
      CVEPROPIETARIO: cilindro.CVEPROPIETARIO,
      CONEXION: cilindro.CONEXION,
      CVEORIGEN: cilindro.CVEORIGEN,
      SUCURSAL: cilindro.SUCURSAL,
      NORMA_FABRICACION: cilindro.NORMA_FABRICACION,
      COMPANIA: cilindro.COMPANIA,
      FHULTMOV: cilindro.FHULTMOV,
      ULOTELLE: cilindro.ULOTELLE,
      FHULTLLE: cilindro.FHULTLLE,
      DESCCORTA: cilindro.DESCCORTA,
      UDM: cilindro.UDM,
      LINEA_CUBO: cilindro.LINEA_CUBO
    }));
    this.adminFileService.descargarXLSX(data, 'CilindrosEscaneados');
  }


}
