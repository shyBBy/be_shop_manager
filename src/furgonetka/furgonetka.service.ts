import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FurgonetkaService {
  public async getPackage(
    trackingNumber: string,
    furgonetka_access_token: string,
  ) {
    const url = 'https://api.furgonetka.pl/packages';
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${furgonetka_access_token}`,
        },
      });

      const packages = res.data.packages;
      try {
        const foundPackage = packages.find(
          (onePackage) => onePackage.parcels[0].package_no === trackingNumber,
        );
        return foundPackage;
      } catch (e) {
        return null;
      }
    } catch (e) {
      console.log('W FURGONETKA SERVICE', e);
      throw e;
    }
  }

  public async getShippingStatus(
    package_id: string,
    furgonetka_access_token: string,
  ) {
    const url = `https://api.furgonetka.pl/packages/${package_id}/tracking`;
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${furgonetka_access_token}`,
        },
      });
      const shipping = res.data;
      return shipping;
    } catch (e) {
      return null;
    }
  }
}
