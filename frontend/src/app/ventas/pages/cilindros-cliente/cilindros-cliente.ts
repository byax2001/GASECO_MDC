import { Component, signal } from '@angular/core';
import { TableCilindros } from './components/table-cilindros/table-cilindros';
import { HeaderPage } from "../../../shared/components/header-page/header-page";
import { SearchDebounce } from "../../components/search-debounce/search-debounce";
import Cilindro from '../../interfaces/cilindro.interface';

@Component({
  selector: 'app-cilindros-cliente',
  imports: [TableCilindros, HeaderPage, SearchDebounce],
  templateUrl: './cilindros-cliente.html',
  styleUrl: './cilindros-cliente.css',
})
export default class CilindrosCliente {
  lcilindros = signal<Cilindro[]>([
    { id:1, serie:'123456', tipo:'Tipo A', cveproducto:'ACE-15-CI' },
    { id:2, serie:'789012', tipo:'Tipo B', cveproducto:'NIT-48-CRI' },
    { id:3, serie:'345678', tipo:'Tipo C', cveproducto:'ARG-47-CRI' },
    { id:4, serie:'901234', tipo:'Tipo D', cveproducto:'ACE-15-CI' },
    { id:5, serie:'567890', tipo:'Tipo E', cveproducto:'10008' },

  ]);

  onSearch(query: string){

  }
}
