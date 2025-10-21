import { useToast } from "react-native-toast-notifications";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { navigationRef } from '../../navigation/NavigationService';
import useAutoLogout from "./useAutoLogout";

const useSendBookingHandler = () => {
  const { resetTimer } = useAutoLogout();
  const toast = useToast();
  //const navigation = useNavigation();
  const dashboardData = useSelector(state => state.dashboard);
  const dashboardMiniData = useSelector(state => state.dashboardMini);

  const showAlert = (message) => {
    toast.show('', {
      data: {
        isSuccess: false,
        heading: 'Alert!',
        describe: message,
      },
    });
  };

  
  const daysBetween = (endDate) => {
    // Get today's date
    const today = new Date(); // Start date (today)
    
    // Convert endDate from "DD-MM-YYYY" to a Date object
    const [day, month, year] = endDate.split("-").map(Number);
    const end = new Date(year, month - 1, day); // JS months are 0-based
  
    let daysBetween = 0;
    let currentDate = new Date(today); // Clone today's date
  
    // Loop until currentDate reaches endDate
    while (currentDate < end) {
        currentDate.setDate(currentDate.getDate() + 1);
        daysBetween++;
    }
  
    //console.log("@@@@@@@ Calendar days between: " + daysBetween);
    return daysBetween;
  };

  const sendBookingHandler = () => {
    const previousScreen = navigationRef.getCurrentRoute()?.name;
     console.log('previousScreen',previousScreen);
    if (dashboardData.BookingWindowStatus === "Open") {
    if (dashboardData.LicenseApplicable === "True") {
      if (!dashboardData.LicenseNo || dashboardData.LicenseNo === "NA") {
        showAlert("Please provide a valid Dealer License Number.");
      } else if (!dashboardData.LicenseValidity) {
        showAlert("Please provide the Dealer License Expiry Date.");
      } else if (daysBetween(dashboardMiniData.LicenseValidity) < 0) {
        showAlert("Dealer License has expired.");
      } else if (parseFloat(dashboardData.PermitLimit) <= 0.0) {
        showAlert("Permit limit exceeded.");
      } else if (dashboardMiniData.C27 === "NO") {
        showAlert("Required documents are not valid.");
      } else if (dashboardMiniData.GST === "Not provided by customer") {
        showAlert("GST Number not provided.");
      } else {
        requestAnimationFrame(() => {
               
                navigationRef.reset({
                          index: previousScreen?1:0,
                          routes: previousScreen ? [{ name: previousScreen }, { name: 'SendBooking' }] : [{ name: 'SendBooking' }],
                        });
              });
        //navigationRef.navigate('SendBooking');
      }
    } else {
      if (dashboardMiniData.C27 === "NO") {
        showAlert("Required documents are not valid.");
      } else if (dashboardMiniData.GST === "Not provided by customer") {
        showAlert("GST Number not provided.");
      } else {
        requestAnimationFrame(() => {
          
          navigationRef.reset({
            index: previousScreen?1:0,
            routes: previousScreen ? [{ name: previousScreen }, { name: 'SendBooking' }] : [{ name: 'SendBooking' }],
          });

        });
       // navigationRef.navigate('SendBooking');
      }
    }
  }else {
      showAlert("Booking window close please check booking window timing from your CA.");
    }
  };
  resetTimer();
  return { sendBookingHandler };
};

export default useSendBookingHandler;
