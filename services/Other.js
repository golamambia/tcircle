import {deleteServiceAuthorized, getService, getServiceAuthorized, postService, postServiceAuthorized, postServiceFormData, postServiceFormDataAuthorized, putServiceAuthorized} from '../configs/FetchRequest';

const OtherService = {};

OtherService.myPoints = (token) => getServiceAuthorized(
    `/api/v1/pointsNode/getAvailablePoints`,
    token
  );

OtherService.editAddress = (payload, token) => putServiceAuthorized(
    `/pointRedemptions/api/v1/orders/address`,
    payload,
    token
  );

OtherService.contentSpot = (query, token) => getServiceAuthorized(
    `/catalognodes/contentspots/mobileApp${query}`,
    token
  );

OtherService.contactUs = (token) => getServiceAuthorized(
    `/catalognodes/contact-us`,
    token
  );

OtherService.dynamicDrawerOptions = (payload, token) => postServiceAuthorized(
    `/api/v1/registrationProfileNode/dynamic/menu`,
    payload,
    token
  );

OtherService.userGuide = (token) => getServiceAuthorized(
    `/catalognodes/contentspots/userGuideMobileApp`,
    token
  );

OtherService.allHier = () => getService(
    `/api/v1/masterNode/all/master/hierarchies`,
  );





export default OtherService;