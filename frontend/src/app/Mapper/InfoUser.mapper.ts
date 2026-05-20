import { InfoUser } from '../interfaces/InfoUser.interface';
import { InfoAppResponse } from '../interfaces/InfoAppResponse.interface';

export default function mapToInfoUser(data: InfoAppResponse[]): InfoUser {
  const infoUser: InfoUser = {};

  data.forEach(item => {
    if (!infoUser[item.COMPANY]) {
      infoUser[item.COMPANY] = {};
    }

    infoUser[item.COMPANY][item.AREA] = item.CODIGO;
  });

  return infoUser;
}