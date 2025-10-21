export const validateMobileNumber = (mobileNumber) => {
    const mobileNumberPattern = /^[6-9]\d{9}$/; // Example for a 10-digit Indian mobile number
    return mobileNumberPattern.test(mobileNumber);
  };
  export const validateDrivingLicense = (licenseNumber) => {
    const licensePattern = /^[A-Z]{2}[0-9]{2} ?[0-9]{4} ?[0-9A-Z]{1,11}$/;
    return licensePattern.test(licenseNumber);
  };  