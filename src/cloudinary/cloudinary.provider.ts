import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';
export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config({
      cloud_name: 'ddnv4r9pb',
      api_key: '842183335533463',
      api_secret: 'w9_5AzYuwubKfExYu2mNeSXu3cU',
      secure: true,
    });
  },
};
