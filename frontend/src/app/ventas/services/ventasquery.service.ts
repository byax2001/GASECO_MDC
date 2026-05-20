import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CompanyService } from './company.service';
import { Cliente } from '../interfaces/cliente.interface';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class VentasQueryService {
  http = inject(HttpClient);
  url = environment.API_URL;
  companyService = inject(CompanyService);


  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(
      `${this.url}/ventas/lclientes/${this.companyService.selectedCompany()}`
    );
  }
}
