import {deleteServiceAuthorized, getService, getServiceAuthorized, postService, postServiceAuthorized, postServiceFormData, postServiceFormDataAuthorized, putServiceAuthorized} from '../configs/FetchRequest';

const ProfileService = {};

ProfileService.getProfile = (id,token) => getServiceAuthorized(
    `/api/v1/profileNode/my/profile/${id}`,
     token
  );

  

export default ProfileService;