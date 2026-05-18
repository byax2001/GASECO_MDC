import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CompanyService } from './company.service';

@Injectable({
  providedIn: 'root',
})
export class VentasQueryService {
  http = inject(HttpClient);
  url = environment.API_URL;
  companyService = inject(CompanyService);

  getClientes() {
    return this.http.get(`${this.url}/ventas/lclientes/${this.companyService.selectedCompany()}`);
  }
}
