import {deleteServiceAuthorized, getService, getServiceAuthorized, postService, postServiceAuthorized, postServiceFormData, postServiceFormDataAuthorized, putServiceAuthorized} from '../configs/FetchRequest';
import { serverLinks } from '../configs/serverLinks';

const CustomerService = {};

 

CustomerService.getCircleList    = (payload=null) => getServiceAuthorized(serverLinks.CIRCLELIST);
 


export default CustomerService;