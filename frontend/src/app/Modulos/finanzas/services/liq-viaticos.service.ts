import { inject, Service } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { UserInfoService } from '../../../services/userInfo.service';
import { HttpClient } from '@angular/common/http';
import { NewIDLV } from '../pages/liq-viaticos/interfaces/NewIDLV.interface';
import { Observable } from 'rxjs';

@Service()
export class LiqViaticosService {
  http = inject(HttpClient);
  url = environment.API_URL;
  userInfoService = inject(UserInfoService);

  getNewIDLV():Observable<NewIDLV>{
    return this.http.get<NewIDLV>(`${this.url}/fin/lv/newid/${this.userInfoService.company()}`);
  }

}
