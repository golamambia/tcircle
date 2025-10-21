import { env } from '../configs/EnvironmentConfig';

export const API_BASE_URL = env.API_ENDPOINT_URL;
export const SessionData ={
     AUTH_DATA_KEY : 'auth-data',
     AUTH_TOKEN : 'auth-data-token',
     AUTH_REFRESH : 'auth-data-refresh-token',
     AUTH_CUSTOMER_MOBILE : 'customer-mobile',
     AUTH_USER_FULLNAME : 'user-fullName',
     AUTH_USERNAME : 'username',
     SOURCE_ID : 'sourceID',
     LOCATION_ID : 'locationID',
     PRODUCT_ID : 'productID',
     PRODUCT_NAME : 'productName',
     USER_DO_NO : 'userDoNo',
     DASHBOARD_BANNER : 'dashboardBanner',
      AUTH_USER_FNAME : 'firstname',
  }
  export const AUTO_LOGOUT_TIME=15 * 60 * 1000;
