import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  selectedCompany = signal('165943');

  setCompany(company: string) {
    this.selectedCompany.set(company);
  }
}
