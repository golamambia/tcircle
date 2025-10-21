import { useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
import SmsListener from 'react-native-android-sms-listener';

const useSmsListener = (onOtpReceived) => {
  useEffect(() => {
    requestSmsPermission();
    const subscription = SmsListener.addListener(message => {
      const otp = extractOtp(message.body);
      if (otp && onOtpReceived) {
        onOtpReceived(otp);
      }
    });

    return () => {
      subscription.remove();
    };
  }, [onOtpReceived]);
};

// Utility function to extract OTP
const extractOtp = (messageBody) => {
  const otpMatch = messageBody.match(/\b\d{6}\b/);
  return otpMatch ? otpMatch[0] : null;
};
async function requestSmsPermission() {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
    {
      title: "SMS Permission",
      message: "This app needs access to your SMS messages.",
      buttonNeutral: "Ask Me Later",
      buttonNegative: "Cancel",
      buttonPositive: "OK",
    }
  );

  if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
    console.log("SMS permission denied");
  }
}

export default useSmsListener;
