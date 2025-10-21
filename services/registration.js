import {getService, getServiceAuthorized, postService, postServiceAuthorized, postServiceFormData, postServiceFormDataAuthorized} from '../configs/FetchRequest';
import { serverLinks } from '../configs/serverLinks';

const RegistrationService = {};


// const loginPort = 9003;

// RegistrationService.getStores = (payload) => postServiceFormData(
//   `Masters/Stores`,
//   payload,
// );
// RegistrationService.getInfluencers = (personaId, token) => getServiceAuthorized(
//   `/api/v1/salesNode/sale/get/all/contractors/${personaId}`,
//   token
// )
RegistrationService.login = (payload) => postService(
  serverLinks.LOGIN,
  payload,
);
RegistrationService.register = (payload) => postService(
  serverLinks.REGISTER,
  payload,
);
 

 

export default RegistrationService;
