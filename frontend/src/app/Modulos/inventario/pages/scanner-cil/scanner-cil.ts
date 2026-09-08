import { Component, ChangeDetectionStrategy, signal, effect, inject, HostListener, ViewChild, computed } from '@angular/core';
import { HeaderPage } from "../../../../shared/components/header-page/header-page";
import { CilindroScan } from '../../interfaces/CilindroScan.interface';
import { EscaneoService } from './services/escaneo.service';
import { Modalg } from "../../../../shared/components/modalg/modalg";
import { TablaCilindrosEsc } from "./components/tabla-cilindros-esc/tabla-cilindros-esc";
import { FilesAdmin } from '../../../../services/files-admin.service';
import { ButtonIcon } from '../../../../shared/components/button-icon/button-icon';
import { Modalact } from "../../../../shared/components/modalact/modalact";
import { ModalScanCil } from "./components/modal-scan-cil/modal-scan-cil";

@Component({
  selector: 'app-scanner-cil',
  imports: [HeaderPage, Modalg, TablaCilindrosEsc, ButtonIcon, Modalact, ModalScanCil],
  templateUrl: './scanner-cil.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './scanner-cil.css',
})
export default class ScannerCil {
  cilindro = signal<string>('');
  //Cilindros Escaneados
  cilindrosEscaneados = signal<CilindroScan[]>([]);
  //Cilindros Temporales, mientras se designa el estado y si tienen etiqueta
  cilindrosPendientes = signal<CilindroScan[]>([]);
  //Marca si el cilindro siguiente no tiene etiqueta
  sinEtiqueta = signal<boolean>(false)

  adminFileService = inject(FilesAdmin);
  escaneoService = inject(EscaneoService);
  @ViewChild('modalG') modalG!: Modalg;
  @ViewChild('modalAct') modalAct!: Modalact;
  @ViewChild('modalScan') modalScan!: ModalScanCil;

  ngOnInit() {
    const storedCilindros = localStorage.getItem('cilindrosEscaneados');
    if (storedCilindros) {
      this.cilindrosEscaneados.set(JSON.parse(storedCilindros));
    }
  }

  cilVacios = computed(()=>{
    if(this.cilindrosEscaneados().length == 0) return 0
    const cilVacios = this.cilindrosEscaneados().filter((cil => cil.ESTADOSCAN === "VAC"))
    return cilVacios.length;
  })

  debounceEffect = effect((onCleanup) =>{
    const value = this.cilindro();
    if(value === '') return; //Si el valor es vacío, no se emite nada
    let tiempo = 1000;
    //Si no tiene etiqueta se agrega mas tiempo para agregar a mano
    if(this.sinEtiqueta()) tiempo+= 3000;
    const timeout = setTimeout(() => {
      //Luego de 500ms de inactividad, se emite el valor del input
      this.buscarCilindro(value);
      console.log('Emitted value:', value);
    }, tiempo);

    onCleanup(() => {
      clearTimeout(timeout);
    });
  })

  @HostListener('window:beforeunload', ['$event'])
    onBeforeUnload(event: BeforeUnloadEvent) {

      localStorage.setItem('cilindrosEscaneados', JSON.stringify(this.cilindrosEscaneados()));
      if (this.cilindrosEscaneados().length > 0) {
        event.preventDefault();
        event.returnValue = '';
      }
    }

  //SE BUSCA EL CILINDRO EN BASE A SU SERIE
  buscarCilindro(cilindro?: string) {
    //Busca si hay un cilindro ya escaneado
    const yaEscaneado = this.cilindrosEscaneados().some(
      cil => cil.SERIE === cilindro
    );

    if(yaEscaneado){
      this.modalG.showModalG('Error','Cilindro ya escaneado.');
      this.cilindro.set('');
      return;
    }
   
    this.escaneoService.buscarCilindro(cilindro!).subscribe({
      next: (data) => {
        if(data.length === 0){
          this.cilindro.set('');
          this.sinEtiqueta.set(false);
          this.modalG.showModalG('Cilindro no encontrado', 'No se encontro ningun cilindro con la serie: ' + cilindro + '.');
          return;
        }

        if(data.length >1 ){
          this.modalG.showModalG('Cilindro Duplicado', 'Se encontro mas de un cilindro con la misma serie.');
        }
        

        this.modalScan.showModalAct('Estado de Cilindro', 'Indique el Estado de Cilindro')
         // Guardar temporalmente
        this.cilindrosPendientes.set(data);

        // Activa un Modal que asigna un Estado y el cual emite dependiendo de la opción
        // Redirigiendo al metodo asignarEstado()
        this.modalScan.showModalAct(
          'Estado de Cilindro',
          'Indique el Estado de Cilindro'
        );

        this.cilindro.set('');
      },
      error: (error) => {
        console.error('Error al buscar el cilindro:', error);
        this.sinEtiqueta.set(false)
        this.cilindro.set('');
      },
    });
  }

  asignarEstado(estado: string) {

    if(estado!='CAN'){
      //CAMBIA TODOS LOS CILINDROS AL ESTADO REQUERIDO (SIEMPRE SERIA UN UNICO CILINDRO)
      const cilindrosConEstado = this.cilindrosPendientes().map(cil => ({
        ...cil,
        ESTADOSCAN: estado,
        SINETIQUETA:this.sinEtiqueta()
      }));
      //SE ACTUALIZAL LOS CILINDROS ESCANEADOS
      this.cilindrosEscaneados.update(actual => [
        ...actual,
        ...cilindrosConEstado
      ]);

      // SE ALMACENAN EN LOCAL STORAGE
      localStorage.setItem(
        'cilindrosEscaneados',
        JSON.stringify(this.cilindrosEscaneados())
      );
    }
    // SE VACIAN LOS CILINDROS PENDIENTES.
    this.cilindrosPendientes.set([]);
    this.sinEtiqueta.set(false);

    // SE CIERRA EL MODAL
    this.modalScan.closeModal();
  }

  removeLinea(index: number) {
    this.cilindrosEscaneados.update(actual => {
      const newArray = [...actual];
      newArray.splice(index, 1);
      return newArray;
    });
    localStorage.setItem('cilindrosEscaneados', JSON.stringify(this.cilindrosEscaneados()));
  }


  descargarExcel() {
    if(this.cilindrosEscaneados().length === 0){
      alert('No hay datos para exportar');
      return;
    }

    const data = this.cilindrosEscaneados().map(cilindro => ({
      IDCILINDRO: cilindro.IDCILINDRO,
      SERIE: cilindro.SERIE,
      CVEPRODUCTO_CP: cilindro.CVEPRODUCTO_CP, 
      CVEENVASE: cilindro.CVEENVASE,
      ESTADOSCANEO: cilindro.ESTADOSCAN,
      SINETIQUETA: cilindro.SINETIQUETA,
      UBACTUAL: cilindro.UBACTUAL,
      REFUBACTUAL: cilindro.REFUBACTUAL,
      FHULTMOV: new Date(cilindro.FHULTMOV),
      DIASENCLIENTE: this.getDiasCliente(cilindro.UBACTUAL,cilindro.FHULTMOV),
      UBANTERIOR: cilindro.UBANTERIOR,
      REFUBANTERIOR: cilindro.REFUBANTERIOR,
      MTSCUBICOS: cilindro.MTSCUBICOS,
      FHREGISTRO: cilindro.FHREGISTRO,
      USUARIO: cilindro.USUARIO,
      STATUS: cilindro.STATUS,
      OBSERVACION: cilindro.OBSERVACION,
      NUMCERTIFICADO: cilindro.NUMCERTIFICADO,
      FECHAPH: cilindro.FECHAPH,
      PESO: cilindro.PESO,
      CAPACIDAD: cilindro.CAPACIDAD,
      FABRICANTE: cilindro.FABRICANTE,
      CVEPROPIETARIO: cilindro.CVEPROPIETARIO,
      CONEXION: cilindro.CONEXION,
      CVEORIGEN: cilindro.CVEORIGEN,
      SUCURSAL: cilindro.SUCURSAL,
      NORMA_FABRICACION: cilindro.NORMA_FABRICACION,
      COMPANIA: cilindro.COMPANIA,
      ULOTELLE: cilindro.ULOTELLE,
      FHULTLLE: cilindro.FHULTLLE,
      DESCCORTA: cilindro.DESCCORTA,
      UDM: cilindro.UDM,
      LINEA_CUBO: cilindro.LINEA_CUBO
    }));
    this.adminFileService.descargarXLSX(data, 'CilindrosEscaneados');
  }

  getDiasCliente(Ubacutal:string, fhultmov:Date):number{
    if(Ubacutal!=="CLI") return 0;

    const entrega = new Date(fhultmov);
    entrega.setHours(0, 0, 0, 0);

    return Math.floor(
        (Date.now() - entrega.getTime()) /
        (1000 * 60 * 60 * 24)
      )
  }

  limpiarCilindros() {
    localStorage.removeItem('cilindrosEscaneados');
    this.cilindrosEscaneados.set([]);
  }

}
